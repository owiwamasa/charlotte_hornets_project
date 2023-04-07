"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.Player, { foreignKey: "person_id" });
      Event.belongsTo(models.Game, { foreignKey: "game_id" });
    }
  }
  Event.init(
    {
      event_num: DataTypes.INTEGER,
      period: DataTypes.INTEGER,
      game_clock: DataTypes.STRING,
      time_remaining: DataTypes.STRING,
      home_score: DataTypes.INTEGER,
      visitor_score: DataTypes.INTEGER,
      loc_x: DataTypes.FLOAT,
      loc_y: DataTypes.FLOAT,
      stat: DataTypes.STRING,
      person_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
