const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../models/index.js");
const {
  async_handler,
  calculate_change_in_average_by_game,
  calculate_player_pct_of_team_totals,
  calculate_shooting_pct_change_in_average,
  location_snake_case_to_name,
} = require("../utils.js");
const {
  Player,
  Team,
  TeamAverage,
  PlayerAverage,
  TeamBoxScore,
  PlayerBoxScore,
  PlayerShootingLocationPct,
} = db;

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log(`Running on port ${port}`));

app.get(
  "/teams",
  async_handler(async (req, res) => {
    const teams = await Team.findAll({
      order: [["team_name", "ASC"]],
    });
    res.send(teams);
  })
);

app.get(
  "/teams/:team_id",
  async_handler(async (req, res) => {
    const { team_id } = req.params;
    const team = await Team.findByPk(team_id, {
      include: [TeamAverage],
    });
    const players = await Player.findAll({
      where: { team_id },
      include: [PlayerAverage],
    });

    res.send({
      team,
      players,
    });
  })
);

app.get(
  "/teams/:team_id/stats/:stat_name",
  async_handler(async (req, res) => {
    const { team_id, stat_name } = req.params;
    const team = await Team.findByPk(team_id, {
      include: [TeamBoxScore],
      order: [[{ model: TeamBoxScore }, "game_id", "ASC"]],
    });
    let season_avg;
    if (!stat_name.includes("pct")) {
      season_avg = calculate_change_in_average_by_game(
        team.TeamBoxScores,
        stat_name
      );
    } else {
      season_avg = calculate_shooting_pct_change_in_average(
        team.TeamBoxScores,
        stat_name
      );
    }
    const formatted_data = team.TeamBoxScores.map((box_score, index) => ({
      game_number: index + 1,
      game_total: box_score[stat_name],
      avg: season_avg[index],
    }));
    res.send(formatted_data);
  })
);

app.get(
  "/teams/:team_id/players/:person_id/stats/:stat_name",
  async_handler(async (req, res) => {
    const { person_id, stat_name, team_id } = req.params;
    const player = await Player.findByPk(person_id, {
      include: [PlayerBoxScore],
      order: [[{ model: PlayerBoxScore }, "game_id", "ASC"]],
    });
    let season_avg;
    if (!stat_name.includes("pct")) {
      season_avg = calculate_change_in_average_by_game(
        player.PlayerBoxScores,
        stat_name
      );
    } else {
      season_avg = calculate_shooting_pct_change_in_average(
        player.PlayerBoxScores,
        stat_name
      );
    }

    const formatted_data = { avg: [] };
    formatted_data.avg = player.PlayerBoxScores.map((box_score, index) => ({
      game_number: index + 1,
      game_total: box_score[stat_name],
      avg: season_avg[index],
    }));
    if (!stat_name.includes("pct")) {
      formatted_data["pct"] = await calculate_player_pct_of_team_totals(
        player.PlayerBoxScores,
        stat_name,
        team_id
      );
    } else {
      shooting_location_data = await PlayerShootingLocationPct.findOne({
        where: { person_id },
      });
      const shooting_data_filtered_keys = Object.keys(
        shooting_location_data.dataValues
      ).filter(
        (key) => !["id", "person_id", "createdAt", "updatedAt"].includes(key)
      );
      formatted_data["location_pct"] = shooting_data_filtered_keys.map(
        (key) => ({
          name: location_snake_case_to_name[key],
          value: shooting_location_data.dataValues[key],
        })
      );
    }
    res.send(formatted_data);
  })
);
