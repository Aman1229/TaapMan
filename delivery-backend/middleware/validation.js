// middleware/validation.js
const { body } = require('express-validator');

exports.validateEstimation = [
  body('serviceType')
    .isIn(['PART_LOAD', 'FULL_TRUCK', 'DEDICATED'])
    .withMessage('Invalid service type'),
  
  body('pickupLocation')
    .trim()
    .notEmpty()
    .withMessage('Pickup location is required'),
  
  body('dropLocation')
    .trim()
    .notEmpty()
    .withMessage('Drop location is required'),
  
  body('vehicleType')
    .isString()
    .notEmpty()
    .withMessage('Vehicle type is required'),
  
  body('temperature')
    .isFloat({ min: -50, max: 50 })
    .withMessage('Temperature must be between -50 and 50'),
  
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  
  body('productType')
    .isIn(['perishable', 'fragile', 'general'])
    .withMessage('Invalid product type'),
  
  body('pickupDate')
    .isISO8601()
    .withMessage('Invalid pickup date format'),
  
  body('dropDate')
    .isISO8601()
    .withMessage('Invalid drop date format')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.pickupDate)) {
        throw new Error('Drop date must be after pickup date');
      }
      return true;
    })
];