module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    'District',
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

  District.associate = (models) => {
    District.hasMany(models.SubDistrict, {
      foreignKey: {
        name: 'districtId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    District.belongsTo(models.Province, {
      foreignKey: {
        name: 'provinceId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return District;
};
