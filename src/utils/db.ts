import mongoose from "mongoose";

async function connectDb() {
  try {
    const db_uri = process.env.MONGODB_URI;
    if (!db_uri) {
      throw new Error("MONGODB_URI is not set");
    }
    await mongoose.connect(db_uri, {
      family: 4,
      connectTimeoutMS: 60000,
      serverSelectionTimeoutMS: 60000,
    });
    console.log(`🛢 Database is connected successfully`);
  } catch (err) {
    mongoose.disconnect();
    console.log("Failed to connect database", err);
  }
}

export default connectDb;
