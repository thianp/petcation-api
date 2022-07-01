module.exports = (sequelize, DataTypes) => {
  const Host = sequelize.define(
    'Host',
    {
      uId: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      subDistrict: {
        type: DataTypes.STRING,
      },
      zipCode: {
        type: DataTypes.INTEGER,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
      },
      userPic: {
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
