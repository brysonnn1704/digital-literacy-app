const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://amosnunes06_db_user:amos_nunes@cluster0.0peh3yw.mongodb.net/digital_assistant?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;