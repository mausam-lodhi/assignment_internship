import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = {
	// User registration
	register: async (userData) => {
		try {
			const response = await axios.post(`${API_URL}/register`, userData);
			return response.data;
		} catch (error) {
			throw error.response?.data || { error: "Network error occurred" };
		}
	},

	// User login
	login: async (credentials) => {
		try {
			const response = await axios.post(`${API_URL}/login`, {
				emailAddress: credentials.email, // Updated to send emailAddress
				password: credentials.password,
			});
			return response.data;
		} catch (error) {
			throw error.response?.data || { error: "Network error occurred" };
		}
	},

	// Get user profile
	getProfile: async () => {
		try {
			const response = await axios.get(`${API_URL}/profile`);
			return response.data; // Return user data
		} catch (error) {
			throw error.response?.data || { error: "Network error occurred" };
		}
	},
};

export default api;
