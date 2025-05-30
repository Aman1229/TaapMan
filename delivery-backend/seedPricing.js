const sequelize = require('./config/database').sequelize;
const DataTypes = require('sequelize').DataTypes;
const PricingModel = require('./models/pricing');

const Pricing = PricingModel(sequelize, DataTypes);

async function seedPricing() {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates tables

    const pricingData = [
      { key: 'vehicle_chiller', value: 1.2, serviceType: 'default' },
      { key: 'vehicle_van', value: 1.0, serviceType: 'default' },
      { key: 'product_perishable', value: 1.3, serviceType: 'default' },
      { key: 'product_nonperishable', value: 1.0, serviceType: 'default' }
    ];

    for (const entry of pricingData) {
      await Pricing.create(entry);
    }

    console.log('Pricing data seeded successfully.');
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding pricing data:', error);
    process.exit(1);
  }
}

seedPricing();
