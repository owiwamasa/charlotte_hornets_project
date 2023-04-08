'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeamEvent.init({
    event_num: DataTypes.INTEGER,
    period: DataTypes.INTEGER,
    game_clock: DataTypes.STRING,
    time_remaining: DataTypes.STRING,
    home_score: DataTypes.INTEGER,
    visitor_score: DataTypes.INTEGER,
    stat: DataTypes.STRING,
    team_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TeamEvent',
  });
  return TeamEvent;
};