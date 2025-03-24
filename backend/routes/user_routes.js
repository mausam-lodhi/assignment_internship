import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Profile from "../models/profile.js";

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { fullName, emailAddress, password, phoneNumber, companyName, isAgency } = req.body;

		// Validate and normalize email
		if (!emailAddress || typeof emailAddress !== "string") {
			return res.status(400).json({ message: "Email address is required" });
		}

		const normalizedEmail = emailAddress.toLowerCase().trim();

		// Check if user already exists - use normalized email
		const existingUser = await Profile.findOne({
			emailAddress: normalizedEmail,
		});

		if (existingUser) {
			return res.status(409).json({
				message: "An account with this email already exists",
			});
		}

		// Create new user
		const newUser = new Profile({
			fullName,
			emailAddress: normalizedEmail,
			password: await bcrypt.hash(password, 10),
			phoneNumber,
			companyName,
			isAgency,
		});

		await newUser.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).json({
				message: "An account with this email already exists",
			});
		}
		console.error("Error in /register:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { emailAddress, password } = req.body; // Updated to use emailAddress
		const user = await Profile.findOne({ emailAddress }).exec(); // Updated to query by emailAddress
		if (!user) {
			return res.status(401).json({ error: "Invalid email or password" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password); // Fixed password comparison
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		// Return user data without password
		const userData = {
			id: user._id,
			fullName: user.fullName,
			emailAddress: user.emailAddress,
			phoneNumber: user.phoneNumber,
			companyName: user.companyName,
			isAgency: user.isAgency,
		};

		res.status(200).json(userData);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/profile", async (req, res) => {
	try {
		const users = await Profile.find().select("-password");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
