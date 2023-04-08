"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TeamBoxScores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fg: {
        type: Sequelize.INTEGER,
      },
      fga: {
        type: Sequelize.INTEGER,
      },
      fg_pct: {
        type: Sequelize.FLOAT,
      },
      three_make: {
        type: Sequelize.INTEGER,
      },
      three_attempt: {
        type: Sequelize.INTEGER,
      },
      three_pct: {
        type: Sequelize.FLOAT,
      },
      ftm: {
        type: Sequelize.INTEGER,
      },
      fta: {
        type: Sequelize.INTEGER,
      },
      ft_pct: {
        type: Sequelize.FLOAT,
      },
      orb: {
        type: Sequelize.INTEGER,
      },
      drb: {
        type: Sequelize.INTEGER,
      },
      trb: {
        type: Sequelize.INTEGER,
      },
      ast: {
        type: Sequelize.INTEGER,
      },
      stl: {
        type: Sequelize.INTEGER,
      },
      blk: {
        type: Sequelize.INTEGER,
      },
      to: {
        type: Sequelize.INTEGER,
      },
      pf: {
        type: Sequelize.INTEGER,
      },
      pts: {
        type: Sequelize.INTEGER,
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: { model: "Teams" },
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: { model: "Games" },
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
    await queryInterface.dropTable("TeamBoxScores");
  },
};
