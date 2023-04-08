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
        allowNull: false,
      },
      fga: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fg_pct: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      three_make: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      three_attempt: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      three_pct: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      ftm: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fta: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      ft_pct: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      orb: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      drb: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      trb: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      ast: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      stl: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      blk: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      to: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      pf: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      pts: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
