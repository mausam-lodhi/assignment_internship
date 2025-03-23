import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user_routes.js";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

// Middleware
app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:5173"], // Add your frontend URLs
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something broke!" });
});

// Add CORS error handling
app.use((err, req, res, next) => {
	if (err.message.includes("CORS")) {
		res.status(403).json({
			error: "CORS Error",
			message: err.message,
		});
	} else {
		next(err);
	}
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
