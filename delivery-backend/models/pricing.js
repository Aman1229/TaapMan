// // models/pricing.js
// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define('PricingConfig', {
//     key: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     value: {
//       type: DataTypes.FLOAT,
//       allowNull: false
//     },
//     serviceType: {
//       type: DataTypes.STRING,
//       defaultValue: 'default'
//     }
//   }, {
//     tableName: 'Pricings',
//     timestamps: true
//   });
// };


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pricing', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    serviceType: {
      type: DataTypes.STRING,
      defaultValue: 'default'
    }
  });
};
