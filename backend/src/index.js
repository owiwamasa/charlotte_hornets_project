const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../models/index.js");
const {
  async_handler,
  calculate_player_pct_of_team_totals,
  calculate_game_total_and_season_avg_data,
  calculate_shooting_pct_location_data,
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
    res.send(
      calculate_game_total_and_season_avg_data(team.TeamBoxScores, stat_name)
    );
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

    const formatted_data = {
      avg: calculate_game_total_and_season_avg_data(
        player.PlayerBoxScores,
        stat_name
      ),
    };

    if (stat_name.includes("pct")) {
      shooting_location_data = await PlayerShootingLocationPct.findOne({
        where: { person_id },
      });

      formatted_data["location_pct"] = calculate_shooting_pct_location_data(
        shooting_location_data
      );
    } else {
      formatted_data["pct"] = await calculate_player_pct_of_team_totals(
        player.PlayerBoxScores,
        stat_name,
        team_id
      );
    }
    res.send(formatted_data);
  })
);
