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
        allowNull: false,
      },
      fga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fg_pct: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      three_make: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      three_attempt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      three_pct: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      ftm: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fta: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ft_pct: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      orb: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      drb: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      trb: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ast: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stl: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      blk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      to: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pf: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pts: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Teams" },
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
