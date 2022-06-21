const { DOG, CAT } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define(
    'Pet',
    {
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM(DOG, CAT),
      },
      petPic: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      species: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    }
  );

  Pet.associate = (models) => {
    Pet.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Pet;
};
