const db = require("../models");
const { League, Game, Team, Player, Event } = db;

const seed_db = async () => {
  let all_files = [];
  for (let i = 1; i <= 22; i++) {
    const file = require(`../seed_data/pbp_${i}.json`);
    all_files = [...all_files, ...file];
  }
  await clean_and_seed_data(all_files);
};

const clean_and_seed_data = async (data) => {
  for (let i = 0; i < data.length; i++) {
    let game = data[i];
    let league_name = game["@attributes"].League;
    let lg_id = game["@attributes"].Lgid;
    await create_league({ lg_id, league_name });

    let game_id = game["@attributes"].Id;
    let year = game["@attributes"].Year;
    let home_team_id;
    let visitor_team_id;
    let game_created = false;

    for (let j = 0; j < game.Event_pbp.length; j++) {
      let event = game.Event_pbp[j]["@attributes"];
      if (!home_team_id && event.Home_score !== "0") {
        home_team_id = event.Team_id;
      }
      if (!visitor_team_id && event.Visitor_score !== "0") {
        visitor_team_id = event.Team_id;
      }
      if (!game_created && home_team_id && visitor_team_id) {
        await create_game({ game_id, home_team_id, visitor_team_id, year });
        game_created = true;
      }

      await create_team({
        team_id: event.Team_id,
        team_name: event.Team_name,
        lg_id,
      });

      await create_player({
        person_id: event.Person_id,
        first_name: event.First_name,
        last_name: event.Last_name,
        team_id: event.Team_id,
      });

      await create_event(game_id, {
        event_num: event.Event_num,
        period: event.Period,
        game_clock: event.Game_clock,
        time_remaining: event.Time_remaining,
        home_score: event.Home_score,
        visitor_score: event.Visitor_score,
        loc_x: event.loc_x,
        loc_y: event.loc_y,
        stat: event.Stat,
        person_id: event.Person_id,
        game_id,
      });
    }
  }
  return "Seeding Complete";
};

const create_league = async (data) => {
  let league = await League.findOne({
    where: { lg_id: data.lg_id },
  });
  if (!league) {
    league = await League.create({
      league: data.league_name,
      lg_id: data.lg_id,
    });
  }
  return league;
};

const create_game = async (data) => {
  let game = await Game.findOne({
    where: { game_id: data.game_id },
  });
  if (!game) {
    game = await Game.create(data);
  }
  return game;
};

const create_team = async (data) => {
  let team = await Team.findOne({
    where: { team_id: data.team_id },
  });
  if (!team && data.team_name) {
    team = await Team.create(data);
  }
  return team;
};

const create_player = async (data) => {
  let player = await Player.findOne({
    where: { person_id: data.person_id },
  });
  if (!player && data.first_name) {
    player = await Player.create(data);
  }
  return player;
};

const create_event = async (game_id, data) => {
  let event = await Event.findOne({
    where: { event_num: data.event_num, game_id },
  });
  if (!event) {
    event = await Event.create(data);
  }
  return event;
};

seed_db();
