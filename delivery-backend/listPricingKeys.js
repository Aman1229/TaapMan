const sequelize = require('./config/database');
const DataTypes = require('sequelize').DataTypes;
const PricingModel = require('./models/pricing');

const Pricing = PricingModel(sequelize, DataTypes);

Pricing.findAll({ attributes: ['key', 'value'] })
  .then(results => {
    console.log('Pricing keys and values:', results.map(r => r.dataValues));
  })
  .catch(err => {
    console.error('Error fetching pricing keys:', err);
  });
