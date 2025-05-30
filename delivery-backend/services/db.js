//services/db.js
const { Sequelize, DataTypes } = require('sequelize');

// Initialize database connection first
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log
});

// Import model definitions
// const User = require('../models/user')(sequelize, DataTypes);
// const Order = require('../models/order')(sequelize, DataTypes);
// const PricingConfig = require('../models/pricing')(sequelize, DataTypes); // Add this

// Import model definitions
// Initialize models properly
const User = require('../models/user')(sequelize, DataTypes);
const Order = require('../models/order')(sequelize, DataTypes);
const PricingConfig = require('../models/pricing')(sequelize, DataTypes);

// Define relationships after models are initialized
User.hasMany(Order);
Order.belongsTo(User);

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    // Create default pricing config
    await PricingConfig.findOrCreate({
      where: { serviceType: 'default' },
      // defaults: {
      //   partLoadPerKm: 15,
      //   fullTruckPerKm: 25,
      //   dedicatedPerKm: 20,
      //   vehicleMultipliers: JSON.stringify({ 'chiller': 1.2, 'frozen': 1.5 }),
      //   temperatureSurcharge: 500,
      //   productMultipliers: JSON.stringify({ 'perishable': 1.2, 'fragile': 1.3 }),
      //   quantityDiscount: 200
      // }
      defaults: {
        key: 'example_key',
        value: 10.0,
        serviceType: 'default'
      }
    });
    console.log('Database connection established');
  } catch (error) {
    console.error('Unable to connect to database:', error);
    process.exit(1);
  }
};

// Export all needed parts
module.exports = {
    initializeDatabase,
    sequelize,
    User,
    Order,
    PricingConfig // Export PricingConfig
};