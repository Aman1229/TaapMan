const axios = require('axios');

async function testEstimation() {
  try {
    const response = await axios.post('http://localhost:3001/api/estimates/estimations', {
      serviceType: 'PART_LOAD',
      pickupLocation: 'LocationA',
      dropLocation: 'LocationB',
      vehicleType: 'chiller',
      temperature: 'Cold',
      quantity: 10,
      productType: 'perishable',
      pickupDate: '2025-05-22T00:00:00.000Z',
      dropDate: '2025-05-23T00:00:00.000Z'
    });
    console.log('Estimation response:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('API error:', error.response.status, error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testEstimation();
