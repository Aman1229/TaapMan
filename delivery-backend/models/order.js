//model/order.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
      pickup_address: DataTypes.TEXT,
      delivery_address: DataTypes.TEXT,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
      },
      estimated_cost: DataTypes.FLOAT
    });
  };