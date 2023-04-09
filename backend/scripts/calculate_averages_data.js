const db = require("../models");
const { mathRound } = require("../utils");
const {
  PlayerBoxScore,
  TeamBoxScore,
  PlayerAverage,
  TeamAverage,
  Team,
  Player,
} = db;

const calculate_all_averages = async () => {
  const teams = await Team.findAll();
  for (let i = 0; i < teams.length; i++) {
    let team_id = teams[i].id;
    let team_box_scores = await TeamBoxScore.findAll({ where: { team_id } });
    let team_averages = get_averages(team_box_scores);
    await create_team_average(team_averages, team_id);
  }

  const players = await Player.findAll();
  for (let j = 0; j < players.length; j++) {
    let person_id = players[j].id;
    let player_box_scores = await PlayerBoxScore.findAll({
      where: { person_id },
    });
    let player_averages = get_averages(player_box_scores);
    await create_player_average(player_averages, person_id);
  }
};

const get_averages = (box_scores) => {
  return {
    fg: calculate_average(box_scores, "fg"),
    fga: calculate_average(box_scores, "fga"),
    fg_pct: !calculate_average(box_scores, "fga")
      ? 0
      : mathRound(
          (calculate_average(box_scores, "fg") /
            calculate_average(box_scores, "fga")) *
            100,
          1
        ),
    three_make: calculate_average(box_scores, "three_make"),
    three_attempt: calculate_average(box_scores, "three_attempt"),
    three_pct: !calculate_average(box_scores, "three_attempt")
      ? 0
      : mathRound(
          (calculate_average(box_scores, "three_make") /
            calculate_average(box_scores, "three_attempt")) *
            100,
          1
        ),
    ftm: calculate_average(box_scores, "ftm"),
    fta: calculate_average(box_scores, "fta"),
    ft_pct: !calculate_average(box_scores, "fta")
      ? 0
      : mathRound(
          (calculate_average(box_scores, "ftm") /
            calculate_average(box_scores, "fta")) *
            100,
          1
        ),
    orb: calculate_average(box_scores, "orb"),
    drb: calculate_average(box_scores, "drb"),
    trb: mathRound(
      calculate_average(box_scores, "orb") +
        calculate_average(box_scores, "drb"),
      1
    ),
    ast: calculate_average(box_scores, "ast"),
    stl: calculate_average(box_scores, "stl"),
    blk: calculate_average(box_scores, "blk"),
    to: calculate_average(box_scores, "to"),
    pf: calculate_average(box_scores, "pf"),
    pts: calculate_average(box_scores, "pts"),
  };
};

const calculate_average = (box_scores, stat) => {
  const games_played = box_scores.length;
  const stat_total = box_scores.reduce(
    (acc, box_score) => acc + box_score[stat],
    0
  );
  return mathRound(stat_total / games_played, 1);
};

const create_player_average = async (data, person_id) => {
  let player_average = await PlayerAverage.findOne({
    where: { person_id },
  });
  if (!player_average) {
    player_average = await PlayerAverage.create({ ...data, person_id });
  }
  return player_average;
};

const create_team_average = async (data, team_id) => {
  let team_average = await TeamAverage.findOne({
    where: { team_id },
  });
  if (!team_average) {
    team_average = await TeamAverage.create({ ...data, team_id });
  }
  return team_average;
};

calculate_all_averages();
