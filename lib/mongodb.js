import mongoose from "mongoose";
import dns from "node:dns/promises";

// Set custom DNS servers to resolve DNS issues
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

// Cache for MongoDB connection
let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  // Return cached connection if exists
  if (cached.conn) {
    console.log("🟢 Using cached MongoDB connection");
    return cached.conn;
  }

  // Create new connection if no promise exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
    };

    console.log("⏳ Connecting to MongoDB...");

    // Set up event listeners
    mongoose.connection.on("connected", () =>
      console.log("✅ MongoDB connected"),
    );
    mongoose.connection.on("error", (err) =>
      console.log("❌ MongoDB error:", err),
    );
    mongoose.connection.on("disconnected", () =>
      console.log("⚠️ MongoDB disconnected"),
    );

    // Create connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", e);
    throw e;
  }
}
