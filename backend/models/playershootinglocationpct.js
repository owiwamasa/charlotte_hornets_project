'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerShootingLocationPct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayerShootingLocationPct.init({
    paint_pct: DataTypes.INTEGER,
    top_three_pct: DataTypes.INTEGER,
    left_wing_three_pct: DataTypes.INTEGER,
    right_wing_three_pct: DataTypes.INTEGER,
    left_corner_three_pct: DataTypes.INTEGER,
    right_corner_three_pct: DataTypes.INTEGER,
    midrange_pct: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlayerShootingLocationPct',
  });
  return PlayerShootingLocationPct;
};