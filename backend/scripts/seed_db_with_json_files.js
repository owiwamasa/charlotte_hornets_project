const db = require("../models");
const { League, Game, Team, Player, Event } = db;

const seed_db = () => {
  //   for (let i = 1; i <= 22; i++) {
  //   const file = require(`../seed_data/pbp_${i}.json`);
  const file = require(`../seed_data/pbp_1.json`);
  const json_data = JSON.stringify(file);
  clean_and_seed_data(JSON.parse(json_data));
  //   }
};

const clean_and_seed_data = (data) => {
  data.forEach(async (game) => {
    let league_name = game["@attributes"].League;
    let lg_id = game["@attributes"].Lgid;
    let league = await create_league({ lg_id, league_name });

    // let game_id = game["@attributes"].Id;
    // let year = game["@attributes"].Year;
    // let home_team_id;
    // let visitor_team_id;
    // let game_created = false;
    // game.Event_pbp.forEach((data) => {
    //   let event = data["@attributes"];
    //   if (!game_created && event.Home_score !== 0) {
    //     home_team_id = event.Team_id;
    //   }
    //   if (!game_created && event.Visitor_score !== 0) {
    //     visitor_team_id = event.Team_id;
    //   }
    //   if (!game_created && home_team_id && visitor_team_id) {
    //     create_game({ game_id, home_team_id, visitor_team_id, year });
    //     game_created = true;
    //   }

    //   create_team({
    //     team_id: event.Team_id,
    //     team_name: event.Team_name,
    //     lg_id,
    //   });

    //   create_player({
    //     person_id: event.Person_id,
    //     first_name: event.First_name,
    //     last_name: event.Last_name,
    //     team_id: event.Team_id,
    //   });

    //   create_event({
    //     event_num: event.Event_num,
    //     period: event.Period,
    //     game_clock: event.Game_clock,
    //     time_remaining: event.Time_remaining,
    //     home_score: event.Home_score,
    //     visitor_score: event.Visitor_score,
    //     loc_x: event.loc_x,
    //     loc_y: event.loc_y,
    //     stat: event.Stat,
    //     person_id: event.Person_id,
    //     game_id,
    //   });
    // });
  });
};

const create_league = async (data) => {
  let league = await League.findOne({
    where: { lg_id: Number(data.lg_id) },
  });
  console.log(data.lg_id);
  console.log("!!!!$$$$$$$$$!!!!!!!!", !league);
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
    await Game.create(data);
  }
};
const create_team = async (data) => {
  let team = await Team.findOne({
    where: { team_id: data.team_id },
  });
  if (!team) {
    await Team.create(data);
  }
};
const create_player = async (data) => {
  let player = await Player.findOne({
    where: { person_id: data.person_id },
  });
  if (!player) {
    await Player.create(data);
  }
};
const create_event = async (data) => {
  let event = await Event.findOne({
    where: { event_num: data.event_num },
  });
  if (!event) {
    await Event.create(data);
  }
};

seed_db();
