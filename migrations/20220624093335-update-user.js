"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn("users", "first_name", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "last_name", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "email", {
        type: Sequelize.STRING,
      }),
      queryInterface.renameColumn("users", "phon_number", "phone_number"),
    ]);
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("users", "first_name"),
      queryInterface.removeColumn("users", "last_name"),
      queryInterface.removeColumn("users", "email"),
    ]);
  },
};
