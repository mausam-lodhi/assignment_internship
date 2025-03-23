import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import { useAuth } from "./context/AuthContext";

import MainPage from "./component/main_page";
import SignIn from "./component/login";
import Register from "./component/register";
import Profile from "./component/profile";
import { AuthProvider } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
	const { currentUser, loading } = useAuth();

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl'>Loading...</div>
			</div>
		);
	}

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return children;
};

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/log-in' element={<SignIn />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
