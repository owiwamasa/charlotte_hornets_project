const db = require("../models");
const { Op } = require("sequelize");
const { Game, Player, Event, PlayerBoxScore, TeamBoxScore, TeamEvent } = db;
const { math_round } = require("../utils");

const calculate_all_box_scores = async () => {
  const games = await Game.findAll();
  for (let i = 0; i < games.length; i++) {
    let game = games[i];
    await calculate_team_box_scores_by_game(game.id, game.visitor_team_id);
    await calculate_team_box_scores_by_game(game.id, game.home_team_id);
  }
};

const calculate_team_box_scores_by_game = async (game_id, team_id) => {
  const players = await Player.findAll({
    where: {
      team_id,
    },
  });
  const all_players_box_scores = [];
  for (let i = 0; i < players.length; i++) {
    let person_id = players[i].id;
    let player_played_in_game = await Event.findOne({
      where: {
        stat: "ENTERS_GAME",
        game_id,
        person_id,
      },
    });
    if (player_played_in_game) {
      const fg = await get_stat_total(game_id, person_id, [
        "THREE_POINT_MADE",
        "TWO_POINT_MADE",
      ]);
      const fga = await get_stat_total(game_id, person_id, [
        "THREE_POINT_MADE",
        "TWO_POINT_MADE",
        "MISSED_TWO_POINT",
        "MISSED_THREE_POINT",
      ]);
      const three_make = await get_stat_total(
        game_id,
        person_id,
        "THREE_POINT_MADE"
      );
      const three_attempt = await get_stat_total(game_id, person_id, [
        "THREE_POINT_MADE",
        "MISSED_THREE_POINT",
      ]);
      const ftm = await get_stat_total(game_id, person_id, "FREE_THROW_MADE");
      const fta = await get_stat_total(game_id, person_id, [
        "FREE_THROW_MADE",
        "MISSED_FREE_THROW",
      ]);
      const orb = await get_stat_total(game_id, person_id, "OFFENSIVE_REBOUND");
      const drb = await get_stat_total(game_id, person_id, "DEFENSIVE_REBOUND");
      const ast = await get_stat_total(game_id, person_id, "ASSIST");
      const stl = await get_stat_total(game_id, person_id, "STEAL");
      const blk = await get_stat_total(game_id, person_id, "BLOCKED_SHOT");
      const to = await get_stat_total(game_id, person_id, "TURNOVER");
      const pf = await get_stat_total(game_id, person_id, [
        "PERSONAL_FOUL",
        "OFFENSIVE_FOUL",
      ]);
      let player_box_score_data = {
        person_id,
        game_id,
        fg,
        fga,
        fg_pct: !fga || !fg ? 0 : math_round((fg / fga) * 100, 1),
        three_make,
        three_attempt,
        three_pct:
          !three_attempt || !three_make
            ? 0
            : math_round((three_make / three_attempt) * 100, 1),
        ftm,
        fta,
        ft_pct: !fta || !ftm ? 0 : math_round((ftm / fta) * 100, 1),
        orb,
        drb,
        trb: orb + drb,
        ast,
        stl,
        blk,
        to,
        pf,
        pts: three_make * 3 + (fg - three_make) * 2 + ftm,
      };
      all_players_box_scores.push(player_box_score_data);
      await create_player_box_score(player_box_score_data);
    }
  }

  await create_team_box_score(all_players_box_scores, team_id, game_id);
  return all_players_box_scores;
};

const get_stat_total = async (game_id, person_id, stat_type) => {
  if (Array.isArray(stat_type)) {
    const stat = await Event.findAll({
      where: {
        game_id,
        person_id,
        stat: { [Op.or]: stat_type },
      },
    });
    return stat.length;
  } else {
    const stat = await Event.findAll({
      where: {
        game_id,
        person_id,
        stat: stat_type,
      },
    });
    return stat.length;
  }
};

const get_team_event_stat_total = async (game_id, team_id, stat_type) => {
  const stat = await TeamEvent.findAll({
    where: {
      game_id,
      team_id,
      stat: stat_type,
    },
  });
  return stat.length;
};

const create_player_box_score = async (data) => {
  let player_box_score = await PlayerBoxScore.findOne({
    where: { game_id: data.game_id, person_id: data.person_id },
  });
  if (!player_box_score) {
    player_box_score = await PlayerBoxScore.create(data);
  }
  return player_box_score;
};

const calculate_team_total = (all_players_box_scores, stat) => {
  const sum = all_players_box_scores.reduce(
    (acc, player) => acc + player[stat],
    0
  );
  return sum;
};

const create_team_box_score = async (
  all_players_box_scores,
  team_id,
  game_id
) => {
  let team_box_score = await TeamBoxScore.findOne({
    where: {
      team_id,
      game_id,
    },
  });
  if (!team_box_score) {
    const team_box_score_data = {
      team_id,
      game_id,
      fg: calculate_team_total(all_players_box_scores, "fg"),
      fga: calculate_team_total(all_players_box_scores, "fga"),
      fg_pct: !calculate_team_total(all_players_box_scores, "fga")
        ? 0
        : math_round(
            (calculate_team_total(all_players_box_scores, "fg") /
              calculate_team_total(all_players_box_scores, "fga")) *
              100,
            1
          ),
      three_make: calculate_team_total(all_players_box_scores, "three_make"),
      three_attempt: calculate_team_total(
        all_players_box_scores,
        "three_attempt"
      ),
      three_pct: !calculate_team_total(all_players_box_scores, "three_attempt")
        ? 0
        : math_round(
            (calculate_team_total(all_players_box_scores, "three_make") /
              calculate_team_total(all_players_box_scores, "three_attempt")) *
              100,
            1
          ),
      ftm: calculate_team_total(all_players_box_scores, "ftm"),
      fta: calculate_team_total(all_players_box_scores, "fta"),
      ft_pct: !calculate_team_total(all_players_box_scores, "fta")
        ? 0
        : math_round(
            (calculate_team_total(all_players_box_scores, "ftm") /
              calculate_team_total(all_players_box_scores, "fta")) *
              100,
            1
          ),
      orb:
        calculate_team_total(all_players_box_scores, "orb") +
        (await get_team_event_stat_total(
          game_id,
          team_id,
          "TEAM_OFFENSIVE_REBOUND"
        )),
      drb:
        calculate_team_total(all_players_box_scores, "drb") +
        (await get_team_event_stat_total(
          game_id,
          team_id,
          "TEAM_DEFENSIVE_REBOUND"
        )),
      trb:
        calculate_team_total(all_players_box_scores, "orb") +
        calculate_team_total(all_players_box_scores, "drb") +
        (await get_team_event_stat_total(
          game_id,
          team_id,
          "TEAM_OFFENSIVE_REBOUND"
        )) +
        (await get_team_event_stat_total(
          game_id,
          team_id,
          "TEAM_DEFENSIVE_REBOUND"
        )),
      ast: calculate_team_total(all_players_box_scores, "ast"),
      stl: calculate_team_total(all_players_box_scores, "stl"),
      blk: calculate_team_total(all_players_box_scores, "blk"),
      to:
        calculate_team_total(all_players_box_scores, "to") +
        (await get_team_event_stat_total(game_id, team_id, "TEAM_TURNOVER")),
      pf: calculate_team_total(all_players_box_scores, "pf"),
      pts:
        calculate_team_total(all_players_box_scores, "three_make") * 3 +
        (calculate_team_total(all_players_box_scores, "fg") -
          calculate_team_total(all_players_box_scores, "three_make")) *
          2 +
        calculate_team_total(all_players_box_scores, "ftm"),
    };
    team_box_score = await TeamBoxScore.create(team_box_score_data);
  }
  return team_box_score;
};

calculate_all_box_scores();
