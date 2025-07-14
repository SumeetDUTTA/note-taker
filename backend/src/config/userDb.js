import mongoose from "mongoose";

export const connectUserDB = async () => {
  try {
    await mongoose.connect(process.env.Mongi_URI);
    console.log("User database connected successfully");
  } catch (error) {
    console.error("User database connection failed:", error);
    process.exit(1);
  }
}

export default connectUserDB;