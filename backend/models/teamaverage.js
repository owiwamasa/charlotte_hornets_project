"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamAverage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  TeamAverage.init(
    {
      fg: DataTypes.FLOAT,
      fga: DataTypes.FLOAT,
      fg_pct: DataTypes.FLOAT,
      three_make: DataTypes.FLOAT,
      three_attempt: DataTypes.FLOAT,
      three_pct: DataTypes.FLOAT,
      ftm: DataTypes.FLOAT,
      fta: DataTypes.FLOAT,
      ft_pct: DataTypes.FLOAT,
      orb: DataTypes.FLOAT,
      drb: DataTypes.FLOAT,
      trb: DataTypes.FLOAT,
      ast: DataTypes.FLOAT,
      stl: DataTypes.FLOAT,
      blk: DataTypes.FLOAT,
      to: DataTypes.FLOAT,
      pf: DataTypes.FLOAT,
      pts: DataTypes.FLOAT,
      team_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TeamAverage",
    }
  );
  return TeamAverage;
};
