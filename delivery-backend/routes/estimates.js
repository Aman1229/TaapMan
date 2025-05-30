//route/estimations.js
const express = require('express');
const router = express.Router();
const { createEstimation, getPricingConfig } = require('../controllers/pricing.controller');
const { validateEstimation } = require('../middleware/validation');
const { calculateDistance } = require('../services/geocode'); // Import the service


router.post('/estimations', validateEstimation, createEstimation);

// ✅ New route to calculate distance
router.post('/distance', async (req, res) => {
  const { origin, destination } = req.body;

  try {
    const distance = await calculateDistance(origin, destination);
    res.json({ distance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate distance' });
  }
});

// Add missing route to get pricing config
router.get('/pricing/config', getPricingConfig);

module.exports = router;
