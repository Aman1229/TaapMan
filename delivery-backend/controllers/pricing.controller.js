//controller/pricing.controller.js
const { calculateEstimation } = require('../services/estimation.service');
const Pricing = require('../models/pricing')(require('../config/database'), require('sequelize').DataTypes);


exports.createEstimation = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body);
    const estimation = await calculateEstimation(req.body);
    res.status(200).json(estimation);
  } catch (error) {
    console.error('Estimation error:', {
      message: error.message,
      stack: error.stack,
      requestBody: req.body
    });
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updatePricing = async (req, res) => {
  try {
    const [updated] = await Pricing.update(req.body, {
      where: { serviceType: req.body.serviceType }
    });
    
    res.json({ success: updated > 0 });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPricingConfig = async (req, res) => {
  try {
    const pricingEntries = await Pricing.findAll();
    // Transform the entries into a structured object expected by frontend
    const config = {
      vehicles: {},
      temperatureMultiplier: 1.2,
      products: {},
      bulkDiscount: 0.9
    };

    pricingEntries.forEach(entry => {
      const key = entry.key.toLowerCase();
      const serviceType = entry.serviceType.toUpperCase();

      if (key === 'temperaturemultiplier') {
        config.temperatureMultiplier = entry.value;
      } else if (key === 'bulkdiscount') {
        config.bulkDiscount = entry.value;
      } else if (key.startsWith('vehicle_')) {
        // e.g. vehicle_chiller, vehicle_frozen
        const vehicleType = key.replace('vehicle_', '');
        config.vehicles[vehicleType] = entry.value;
      } else if (key.startsWith('product_')) {
        // e.g. product_perishable, product_fragile
        const productType = key.replace('product_', '');
        config.products[productType] = entry.value;
      } else {
        // Treat as serviceType rate
        if (!config[serviceType]) {
          config[serviceType] = {};
        }
        config[serviceType].rate = entry.value;
      }
    });

    res.json(config);
  } catch (error) {
    console.error('Error fetching pricing config:', error);
    res.status(500).json({ error: 'Failed to fetch pricing config' });
  }
};
