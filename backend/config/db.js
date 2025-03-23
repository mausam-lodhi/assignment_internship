import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
	const MONGODB_URI = process.env.MONGODB_URI;
	if (!MONGODB_URI) {
		console.error("MONGODB_URI is not defined in the environment variables");
		process.exit(1);
	}
	try {
		await mongoose.connect(MONGODB_URI);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};

export default connectDB;
