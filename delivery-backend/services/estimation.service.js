//services/estimation.service.js
const { calculateDistance } = require('./geocode'); // or './distance'
const Pricing = require('../models/pricing')(require('../config/database'), require('sequelize').DataTypes);

async function getPrice(key) {
  try {
    const pricingEntry = await Pricing.findOne({ where: { key } });
    if (!pricingEntry) {
      console.warn(`No pricing entry found for key: ${key}`);
      return null;
    }
    return pricingEntry.value;
  } catch (error) {
    console.error('Error fetching price for key:', key, error);
    return null;
  }
}

async function calculateEstimation(data) {
  let distance;
  try {
    distance = await calculateDistance(data.pickupLocation, data.dropLocation);
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
  const deliveryDays = Math.ceil(distance / 500);

  const basePrice = 100;
  const vehicleMultiplier = await getPrice(`vehicle_${data.vehicleType}`) || 1;
  const productMultiplier = await getPrice(`product_${data.productType}`) || 1;
  const temperatureMultiplier = data.temperature === 'Cold' ? 1.5 : 1;

  const totalPrice = Math.ceil(
    basePrice *
      vehicleMultiplier *
      productMultiplier *
      temperatureMultiplier *
      Math.log(data.quantity + 1)
  );

  return {
    deliveryDays,
    totalPrice,
    breakdown: {
      basePrice,
      vehicleMultiplier,
      productMultiplier,
      temperatureMultiplier,
      quantity: data.quantity,
      distance,
    },
  };
}
module.exports = { calculateEstimation };

