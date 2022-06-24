module.exports = (sequelize, DataTypes) => {
  const Geographie = sequelize.define(
    'Geographie',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Geographie.associate = (models) => {
    Geographie.hasMany(models.Province, {
      foreignKey: {
        name: 'geographyId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Geographie;
};
