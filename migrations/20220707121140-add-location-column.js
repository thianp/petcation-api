'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('houses', 'pin_address', {
      type: Sequelize.DataTypes.STRING,
    });
    return queryInterface.addColumn('houses', 'location', {
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('houses', 'pin_address');
    return queryInterface.removeColumn('houses', 'location');
  },
};
