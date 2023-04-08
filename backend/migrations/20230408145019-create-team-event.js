"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TeamEvents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      event_num: {
        type: Sequelize.INTEGER,
      },
      period: {
        type: Sequelize.INTEGER,
      },
      game_clock: {
        type: Sequelize.STRING,
      },
      time_remaining: {
        type: Sequelize.STRING,
      },
      home_score: {
        type: Sequelize.INTEGER,
      },
      visitor_score: {
        type: Sequelize.INTEGER,
      },
      stat: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("TeamEvents");
  },
};
