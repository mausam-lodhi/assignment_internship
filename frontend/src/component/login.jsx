import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setCredentials({ ...credentials, [id]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await api.login(credentials);
			login(response);
			navigate("/profile");
		} catch (err) {
			setError(err.error || "Invalid email or password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div id='webcrumbs'>
			<div className='flex justify-center items-start w-full min-h-screen bg-gray-50 pt-6'>
				<div className='bg-white border-gray-100 rounded-md w-full mx-auto overflow-hidden max-w-[370px] p-2 h-[90vh] shadow-sm border'>
					<div className='p-2'>
						<h1 className='text-2xl font-bold'>Signin to your</h1>
						<h1 className='text-2xl font-bold mb-2'>PopX account</h1>
						<p className='text-xl text-gray-500 mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

						{error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4'>{error}</div>}

						<form className='space-y-4' onSubmit={handleSubmit}>
							<div className='space-y-1'>
								<label htmlFor='email' className='block text-sm font-bold text-blue-800'>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									placeholder='Enter email address'
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-base h-8'
									value={credentials.email}
									onChange={handleChange}
									required
								/>
							</div>

							<div className='space-y-1'>
								<label htmlFor='password' className='block text-sm font-bold text-blue-800'>
									Password
								</label>
								<input
									type='password'
									id='password'
									placeholder='Enter password'
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder:text-base h-8'
									value={credentials.password}
									onChange={handleChange}
									required
								/>
							</div>

							<button
								type='submit'
								disabled={loading}
								className='w-full bg-gray-300 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]'>
								{loading ? "Signing in..." : "Login"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
