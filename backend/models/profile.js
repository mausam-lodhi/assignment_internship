import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	emailAddress: {
		type: String,
		required: [true, "Email address is required"],
		unique: true,
		trim: true,
		lowercase: true,
		match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	companyName: {
		type: String,
		default: "",
	},
	isAgency: {
		type: Boolean,
		required: true,
	},
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
