"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamAverage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeamAverage.belongsTo(models.Team, { foreignKey: "team_id" });
    }
  }
  TeamAverage.init(
    {
      fg: DataTypes.FLOAT(1),
      fga: DataTypes.FLOAT(1),
      fg_pct: DataTypes.FLOAT(1),
      three_make: DataTypes.FLOAT(1),
      three_attempt: DataTypes.FLOAT(1),
      three_pct: DataTypes.FLOAT(1),
      ftm: DataTypes.FLOAT(1),
      fta: DataTypes.FLOAT(1),
      ft_pct: DataTypes.FLOAT(1),
      orb: DataTypes.FLOAT(1),
      drb: DataTypes.FLOAT(1),
      trb: DataTypes.FLOAT(1),
      ast: DataTypes.FLOAT(1),
      stl: DataTypes.FLOAT(1),
      blk: DataTypes.FLOAT(1),
      to: DataTypes.FLOAT(1),
      pf: DataTypes.FLOAT(1),
      pts: DataTypes.FLOAT(1),
      team_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TeamAverage",
    }
  );
  return TeamAverage;
};
