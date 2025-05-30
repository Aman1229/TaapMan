//services/geocode.js
const axios = require('axios');
require('dotenv').config(); // Optional if you're using a .env file

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // replace with secure logic

async function calculateDistance(origin, destination) {
  // Mock distance for testing
  console.log('Mock calculateDistance called with:', origin, destination);
  return 1062; // fixed distance in km for testing
  /*
  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status !== 'OK') throw new Error(`API Error: ${data.status}`);
    const element = data.rows[0].elements[0];
    if (element.status !== 'OK') throw new Error(`Distance error: ${element.status}`);

    const distanceKm = element.distance.value / 1000;
    return distanceKm;
  } catch (error) {
    console.error('Distance API failed:', error.message);
    throw error;
  }
  */
}

module.exports = { calculateDistance };
