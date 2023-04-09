const db = require("../models");
const { Team } = db;

const add_logo_url_to_team = async (team_name, logo_url) => {
  const team = await Team.update({ logo_url }, { where: { team_name } });
  console.log(team);
};

add_logo_url_to_team(
  "Zenit St Petersburg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Zenit_St_Peterburg_logo.svg/2560px-Zenit_St_Peterburg_logo.svg.png"
);
