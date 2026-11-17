const mongoose = require('mongoose');

let isConnected = false;

const DEFAULT_CLOUD_URI = 'mongodb+srv://dg142814_db_user:io1gcqGBM3928mmE@cluster0.ya0rq2s.mongodb.net/studclub?retryWrites=true&w=majority';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || DEFAULT_CLOUD_URI;
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
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
