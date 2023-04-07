"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.belongsTo(models.League, { foreignKey: "lg_id" });
      Team.hasMany(models.Game, { foreignKey: "home_team_id" });
      Team.hasMany(models.Game, { foreignKey: "visitor_team_id" });
      Team.hasMany(models.Player, { foreignKey: "team_id" });
    }
  }
  Team.init(
    {
      team_id: DataTypes.STRING,
      team_name: DataTypes.STRING,
      lg_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};
