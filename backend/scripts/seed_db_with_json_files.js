const db = require("../models");
const { League, Game, Team, Player, Event } = db;

const seed_db = () => {
  //   for (let i = 1; i < 2; i++) {
  // const file = require(`../seed_data/pbp_${i}.json`);
  const file = require(`../seed_data/pbp_1.json`);
  const json_data = JSON.stringify(file);
  clean_and_seed_data(JSON.parse(json_data));
  //   create_league(JSON.parse(json_data));
  create_game(JSON.parse(json_data));
  // create_teams(JSON.parse(json_data));
  // create_players(JSON.parse(json_data));
  // create_events(JSON.parse(json_data));
  //   }
};

const clean_and_seed_data = (data) => {
  data.forEach(async (game) => {
    let league_name = game["@attributes"].League;
    let lg_id = game["@attributes"].Lgid;
    create_league({ lg_id, league_name });

    let game_id = game["@attributes"].Id;
    let year = game["@attributes"].year;
  });
};

const create_league = async (data) => {
  let league = await League.findOne({
    where: { lg_id: data.lg_id },
  });
  if (!league) {
    await League.create({ league: data.league_name, lg_id: data.lg_id });
  }
};
const create_game = (data) => {};
const create_teams = (data) => {};
const create_players = (data) => {};
const create_events = (data) => {};

seed_db();
