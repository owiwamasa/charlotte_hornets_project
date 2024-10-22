"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.hasMany(models.TeamBoxScore, { foreignKey: "game_id" });
      Game.hasMany(models.Event, { foreignKey: "game_id" });
      Game.hasMany(models.PlayerBoxScore, { foreignKey: "person_id" });
      Game.hasMany(models.TeamEvent, { foreignKey: "game_id" });
    }
  }
  Game.init(
    {
      year: DataTypes.INTEGER,
      home_team_id: DataTypes.INTEGER,
      visitor_team_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
