module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    'Province',
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameTh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Province.associate = (models) => {
    Province.hasMany(models.District, {
      foreignKey: {
        name: 'provinceId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    Province.belongsTo(models.Geographie, {
      foreignKey: {
        name: 'geographyId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Province;
};
