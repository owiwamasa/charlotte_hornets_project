const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../models/index.js");
const {
  async_handler,
  calculate_change_in_average_by_game,
  calculate_player_pct_of_team_totals,
} = require("../utils.js");
const {
  Player,
  Team,
  TeamAverage,
  PlayerAverage,
  TeamBoxScore,
  PlayerBoxScore,
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

    res.send({
      team: {
        box_scores: team.TeamBoxScores,
        season_avg: calculate_change_in_average_by_game(
          team.TeamBoxScores,
          stat_name
        ),
      },
    });
  })
);

app.get(
  "/players/:person_id/stats/:stat_name",
  async_handler(async (req, res) => {
    const { person_id, stat_name } = req.params;
    const player = await Player.findByPk(person_id, {
      include: [PlayerBoxScore],
      order: [[{ model: PlayerBoxScore }, "game_id", "ASC"]],
    });

    res.send({
      box_scores: player.PlayerBoxScores,
      season_avg: calculate_change_in_average_by_game(
        player.PlayerBoxScores,
        stat_name
      ),
      ...calculate_player_pct_of_team_totals(player.PlayerBoxScores.stat_name),
    });
  })
);
