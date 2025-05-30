//controller/admin.controller.js
const { PricingConfig } = require('../services/db');

exports.getPricing = async (req, res) => {
  try {
    const pricing = await PricingConfig.findOne({
      where: { serviceType: 'default' }
    });
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pricing' });
  }
};

exports.updatePricing = async (req, res) => {
  try {
    const [updated] = await PricingConfig.update(req.body, {
      where: { serviceType: 'default' }
    });
    
    if (updated) {
      const updatedPricing = await PricingConfig.findOne({
        where: { serviceType: 'default' }
      });
      return res.json(updatedPricing);
    }
    
    throw new Error('Pricing config not found');
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};