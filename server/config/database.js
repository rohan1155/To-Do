const mongoose = require("mongoose");

const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
