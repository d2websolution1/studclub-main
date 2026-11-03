const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studclub';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000, // Timeout fast if mongo is not running
    });
    isConnected = true;
    console.log(` MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Notice] MongoDB not reachable at ${uri} (${error.message}).`);
    console.warn(`[Fallback] Using robust local storage engine in backend/data/profiles.json so everything runs smoothly!`);
    isConnected = false;
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
