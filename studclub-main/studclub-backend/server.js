const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
require('dotenv').config();

const { connectDB, getIsConnected } = require('./config/db');
const { seedMongoIfEmpty } = require('./services/profileStore');
const profileRoutes = require('./routes/profileRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*', // Allow frontend & admin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static folder for uploaded photos & fallback images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Root status endpoint - API ONLY (No frontend website here)
app.get('/', (req, res) => {
  res.json({
    name: 'StuddClub VIP Backend API',
    status: 'online',
    version: '1.0.0',
    database: getIsConnected() ? 'MongoDB (Connected)' : 'Local JSON Store (Active & Synced)',
    endpoints: {
      health: '/api/health',
      stats: '/api/stats',
      profiles: '/api/profiles',
      uploads: '/uploads'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: getIsConnected() ? 'MongoDB (Connected)' : 'Local JSON Store (Active & Synced)',
    port: PORT
  });
});

// Mount API routes
app.get('/api/stats', async (req, res) => {
  const profileStore = require('./services/profileStore');
  try {
    const stats = await profileStore.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.use('/api/profiles', profileRoutes);
app.use('/api/upload', uploadRoutes);

// Redirect /admin on API subdomain to the main domain
app.use('/admin', (req, res) => {
  res.redirect(`https://partyplayboys.com/admin${req.url}`);
});

// 404 handler for API routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server
const startServer = async () => {
  // Attempt MongoDB connection
  await connectDB();
  await seedMongoIfEmpty();

  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` StuddClub Backend API running on port ${PORT}`);
    console.log(` API Health:  http://localhost:${PORT}/api/health`);
    console.log(` Profiles:    http://localhost:${PORT}/api/profiles`);
    console.log(` Uploads dir: http://localhost:${PORT}/uploads`);
    console.log(`===============================================`);
  });
};

startServer();
