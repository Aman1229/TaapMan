//server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const { initializeDatabase } = require('./services/db');
const estimateRoutes = require('./routes/estimates');
const mapsRoutes = require('./routes/maps');

const app = express();
const port = process.env.PORT || 3001;

// Enhanced CORS configuration
// const corsOptions = {
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200
  

// };
const allowedOrigins = [
  'https://taap-man-frontend.vercel.app', // ✅ Vercel frontend
  'http://localhost:3000',                // for local dev
  'http://localhost:19006',               // for Expo Go (React Native dev)
  'exp://192.168.0.X:19000',              // optional mobile IP (Expo physical device)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};
console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/estimates', estimateRoutes);
app.use('/api/maps', mapsRoutes);

// Health Check Endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    database: sequelize.config.database,
    dialect: sequelize.getDialect(),
    version: process.env.npm_package_version
  });
});

// Database Initialization
const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('Database initialized');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message
  });
});

// Process handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();