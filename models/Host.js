module.exports = (sequelize, DataTypes) => {
  const Host = sequelize.define(
    'Host',
    {
      uId: {
        type: DataTypes.STRING,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      sub_district: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.INTEGER,
      },
      phon_number: {
        type: DataTypes.INTEGER,
      },
      user_pic: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Host.associate = (models) => {
    Host.hasOne(models.Bookinghouse, {
      foreignKey: {
        name: 'hostId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Host;
};
