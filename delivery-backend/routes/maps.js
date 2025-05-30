//route/maps.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/distance', async (req, res) => {
  try {
    const { pickup, drop } = req.query;
    
    // Decode URI components once
    const decodedPickup = decodeURIComponent(pickup);
    const decodedDrop = decodeURIComponent(drop);

    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: decodedPickup,
        destinations: decodedDrop,
        key: process.env.GOOGLE_API_KEY, // Verify this exists in .env
        units: 'metric'
      }
    });

    // Handle Google API errors
    if (response.data.status !== 'OK') {
      return res.status(400).json({
        error: response.data.error_message || 'Google Maps API error'
      });
    }

    res.json({
      distance: response.data.rows[0].elements[0].distance,
      duration: response.data.rows[0].elements[0].duration
    });
    
  } catch (error) {
    console.error('Maps API error:', error);
    res.status(500).json({ 
      error: error.response?.data?.error_message || 'Distance calculation failed'
    });
  }
});

module.exports = router;