"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.hasMany(models.Event, { foreignKey: "person_id" });
      Player.hasMany(models.PlayerBoxScore, { foreignKey: "person_id" });
      Player.hasMany(models.PlayerAverage, { foreignKey: "person_id" });
      Player.hasOne(models.PlayerShootingLocationPct, {
        foreignKey: "person_id",
      });
    }
  }
  Player.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      team_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  return Player;
};
