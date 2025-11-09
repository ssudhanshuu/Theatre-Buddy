<<<<<<< HEAD
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
=======
const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI||"mongodb://localhost:27017/movie-ticket";

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); 
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
  }
};

module.exports = connectDB;
