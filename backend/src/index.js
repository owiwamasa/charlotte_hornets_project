const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../models/index.js");
const { asyncHandler } = require("../utils.js");
const { models, Team } = db;

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
    const team = await Team.findOne({
      where: { team_id },
      include: [models.Player, models.TeamAverage],
    });

    res.send(team);
  })
);
