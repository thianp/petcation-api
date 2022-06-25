module.exports = (sequelize, DataTypes) => {
  const SubDistrict = sequelize.define(
    "SubDistrict",
    {
      zipCode: {
        type: DataTypes.INTEGER,
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
      tableName: "subdistricts",
    }
  );

  SubDistrict.associate = (models) => {
    SubDistrict.belongsTo(models.District, {
      foreignKey: {
        name: "districtId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return SubDistrict;
};
