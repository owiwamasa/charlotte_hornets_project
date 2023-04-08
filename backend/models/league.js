"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class League extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      League.hasMany(models.Team, { foreignKey: "lg_id" });
    }
  }
  League.init(
    {
      league: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "League",
    }
  );
  return League;
};
