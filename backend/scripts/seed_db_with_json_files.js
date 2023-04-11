const db = require("../models");
const { League, Game, Team, Player, Event, TeamEvent } = db;

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
    await create_league({ id: lg_id, league_name });

    let game_id = game["@attributes"].Id;
    let year = game["@attributes"].Year;
    let home_team_id;
    let visitor_team_id;
    let last_event = game.Event_pbp[game.Event_pbp.length - 1]["@attributes"];
    let game_completed = last_event.Stat === "END_GAME";

    if (!game_completed) continue;

    for (let j = 0; j < game.Event_pbp.length; j++) {
      let event = game.Event_pbp[j]["@attributes"];
      if (!home_team_id && event.Home_score !== "0") {
        home_team_id = event.Team_id;
        await create_team({
          id: event.Team_id,
          team_name: event.Team_name,
          lg_id,
        });
      }
      if (!visitor_team_id && event.Visitor_score !== "0") {
        visitor_team_id = event.Team_id;
        await create_team({
          id: event.Team_id,
          team_name: event.Team_name,
          lg_id,
        });
      }

      if (home_team_id && visitor_team_id) {
        await create_game({ id: game_id, home_team_id, visitor_team_id, year });
        break;
      }
    }

    for (let k = 0; k < game.Event_pbp.length; k++) {
      let event = game.Event_pbp[k]["@attributes"];
      await create_player({
        id: event.Person_id,
        first_name: event.First_name,
        last_name: event.Last_name,
        team_id: event.Team_id,
      });

      if (event.Person_id !== "0") {
        await create_event({
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
          team_id: event.Team_id,
        });
      } else if (event.Team_id !== "0") {
        await create_team_event({
          event_num: event.Event_num,
          period: event.Period,
          game_clock: event.Game_clock,
          time_remaining: event.Time_remaining,
          home_score: event.Home_score,
          visitor_score: event.Visitor_score,
          stat: event.Stat,
          game_id,
          team_id: event.Team_id,
        });
      }
    }
  }
  return "Seeding Complete";
};

const create_league = async (data) => {
  let league = await League.findByPk(data.id);
  if (!league) {
    league = await League.create({
      league: data.league_name,
      id: data.id,
    });
  }
  return league;
};

const create_game = async (data) => {
  let game = await Game.findByPk(data.id);
  if (!game) {
    game = await Game.create(data);
  }
  return game;
};

const create_team = async (data) => {
  let team = await Team.findByPk(data.id);
  if (!team && data.team_name) {
    team = await Team.create(data);
  }
  return team;
};

const create_player = async (data) => {
  let player = await Player.findByPk(data.id);
  if (!player && data.first_name) {
    player = await Player.create(data);
  }
  return player;
};

const create_event = async (data) => {
  let event = await Event.findOne({
    where: { event_num: data.event_num, game_id: data.game_id },
  });
  if (!event && data.person_id !== "0") {
    event = await Event.create(data);
  }
  return event;
};

const create_team_event = async (data) => {
  let team_event = await TeamEvent.findOne({
    where: { event_num: data.event_num, game_id: data.game_id },
  });
  if (!team_event && data.person_id !== "0") {
    team_event = await TeamEvent.create(data);
  }
  return team_event;
};

seed_db();
