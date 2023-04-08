"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayerAverage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlayerAverage.belongsTo(models.Player, { foreignKey: "person_id" });
    }
  }
  PlayerAverage.init(
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
      person_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlayerAverage",
    }
  );
  return PlayerAverage;
};
