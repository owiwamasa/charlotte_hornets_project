const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../models/index.js");
const { asyncHandler } = require("../utils.js");
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
  "/team/:team_id",
  asyncHandler(async (req, res) => {
    const { team_id } = req.params;
    const team = await Team.findByPk(team_id, {
      include: [TeamAverage, TeamBoxScore],
    });
    res.send(team);
  })
);

app.get(
  "/team/:team_id/all_player_stats",
  asyncHandler(async (req, res) => {
    const { team_id } = req.params;
    const players = await Player.findAll({
      where: { team_id },
      include: [PlayerAverage, PlayerBoxScore],
    });
    res.send(players);
  })
);
