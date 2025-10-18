// Step 1
const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) throw new Error('MongoDB connection URI is required');
  await mongoose.connect(uri, { autoIndex: true });
  console.log('Connected to MongoDB');
}

module.exports = { connectDB };