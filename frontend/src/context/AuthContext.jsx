import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is stored in localStorage on app load
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setCurrentUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	// Login function
	const login = (userData) => {
		setCurrentUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	// Logout function
	const logout = () => {
		setCurrentUser(null);
		localStorage.removeItem("user");
	};

	const value = {
		currentUser,
		login,
		logout,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
