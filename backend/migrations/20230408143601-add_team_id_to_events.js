"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Events", // table name
        "team_id", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
          references: { model: "Teams" },
        }
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn("Events", "team_id")]);
  },
};
