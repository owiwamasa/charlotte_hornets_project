"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlayerShootingLocationPcts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      paint_pct: {
        type: Sequelize.INTEGER,
      },
      top_three_pct: {
        type: Sequelize.INTEGER,
      },
      left_wing_three_pct: {
        type: Sequelize.INTEGER,
      },
      right_wing_three_pct: {
        type: Sequelize.INTEGER,
      },
      left_corner_three_pct: {
        type: Sequelize.INTEGER,
      },
      right_corner_three_pct: {
        type: Sequelize.INTEGER,
      },
      midrange_pct: {
        type: Sequelize.INTEGER,
      },
      person_id: {
        type: Sequelize.INTEGER,
        references: { model: "Players" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlayerShootingLocationPcts");
  },
};
