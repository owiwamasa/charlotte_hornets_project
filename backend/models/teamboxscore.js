"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamBoxScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  TeamBoxScore.init(
    {
      fg: DataTypes.INTEGER,
      fga: DataTypes.INTEGER,
      fg_pct: DataTypes.FLOAT,
      three_make: DataTypes.INTEGER,
      three_attempt: DataTypes.INTEGER,
      three_pct: DataTypes.FLOAT,
      ftm: DataTypes.INTEGER,
      fta: DataTypes.INTEGER,
      ft_pct: DataTypes.FLOAT,
      orb: DataTypes.INTEGER,
      drb: DataTypes.INTEGER,
      trb: DataTypes.INTEGER,
      ast: DataTypes.INTEGER,
      stl: DataTypes.INTEGER,
      blk: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
      pf: DataTypes.INTEGER,
      pts: DataTypes.INTEGER,
      team_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TeamBoxScore",
    }
  );
  return TeamBoxScore;
};
