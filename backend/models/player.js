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
      Player.belongsTo(models.Team, { foreignKey: "team_id" });
      Player.hasMany(models.Event, { foreignKey: "person_id" });
    }
  }
  Player.init(
    {
      person_id: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      team_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  return Player;
};
