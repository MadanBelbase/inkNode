import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables from .env

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error("❌ MONGO_URL is not defined in .env");
}

let _db: mongoose.Connection; // Store DB connection

// Function to connect to MongoDB
const mongoconnect = (callback?: () => void): void => {
  mongoose.connect(mongoUrl)
    .then(() => {
      _db = mongoose.connection;
      console.log("✅ Connected to MongoDB using Mongoose");
      if (callback) callback();
    })
    .catch((err: any) => {
      console.error("❌ Error connecting to MongoDB:", err);
    });
};

// Getter to access DB connection
const getDb = (): mongoose.Connection => {
  if (_db) return _db;
  throw new Error("❗ No database found!");
};

export { mongoconnect, getDb };

