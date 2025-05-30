//model/user.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      otp: DataTypes.STRING,
      otp_expiry: DataTypes.DATE,
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
  };