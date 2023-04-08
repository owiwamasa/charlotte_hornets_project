"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlayerAverages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fg: {
        type: Sequelize.FLOAT,
      },
      fga: {
        type: Sequelize.FLOAT,
      },
      fg_pct: {
        type: Sequelize.FLOAT,
      },
      three_make: {
        type: Sequelize.FLOAT,
      },
      three_attempt: {
        type: Sequelize.FLOAT,
      },
      three_pct: {
        type: Sequelize.FLOAT,
      },
      ftm: {
        type: Sequelize.FLOAT,
      },
      fta: {
        type: Sequelize.FLOAT,
      },
      ft_pct: {
        type: Sequelize.FLOAT,
      },
      orb: {
        type: Sequelize.FLOAT,
      },
      drb: {
        type: Sequelize.FLOAT,
      },
      trb: {
        type: Sequelize.FLOAT,
      },
      ast: {
        type: Sequelize.FLOAT,
      },
      stl: {
        type: Sequelize.FLOAT,
      },
      blk: {
        type: Sequelize.FLOAT,
      },
      to: {
        type: Sequelize.FLOAT,
      },
      pf: {
        type: Sequelize.FLOAT,
      },
      pts: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("PlayerAverages");
  },
};
