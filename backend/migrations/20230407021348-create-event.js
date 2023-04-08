"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      event_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      game_clock: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time_remaining: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      home_score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      visitor_score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      loc_x: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      loc_y: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      stat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Players" },
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
    await queryInterface.dropTable("Events");
  },
};
