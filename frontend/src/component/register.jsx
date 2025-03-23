import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added import for useNavigate

export const Register = () => {
	const [isAgency, setIsAgency] = useState(true);
	const [formData, setFormData] = useState({
		fullName: "",
		phoneNumber: "",
		emailAddress: "",
		password: "",
		companyName: "",
	});

	const navigate = useNavigate(); // Initialize useNavigate

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Enhanced email validation
		const emailRegex = /^\S+@\S+\.\S+$/;
		if (!formData.emailAddress || !emailRegex.test(formData.emailAddress.trim())) {
			alert("Please enter a valid email address");
			return;
		}

		try {
			const response = await fetch("http://localhost:5000/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData, isAgency }),
			});
			const result = await response.json();
			if (response.ok) {
				alert("Registration successful!");
				navigate("/log-in"); // Navigate to login page
			} else {
				alert(`Error: ${result.message}`);
			}
		} catch (error) {
			alert(error.response?.data?.message || "Network error. Please try again.");
		}
	};

	return (
		<div id='webcrumbs'>
			<div className='flex justify-center items-center h-screen bg-gray-50'>
				<div className='bg-white shadow-md rounded-lg p-4 w-full  border border-gray-100 max-w-[370px] h-[90vh]'>
					<div className='mb-6'>
						<h1 className='text-3xl font-bold text-gray-800'>Create your</h1>
						<h1 className='text-3xl font-bold text-primary-600'>PopX account</h1>
					</div>

					<form className='space-y-1 flex flex-col h-[calc(90vh-130px)] justify-between' onSubmit={handleSubmit}>
						<div className='space-y-2'>
							<div>
								<label htmlFor='fullName' className='block text-sm font-medium text-gray-700 '>
									Full Name<span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									id='fullName'
									placeholder='Marry Doe'
									value={formData.fullName}
									onChange={handleChange}
									className='w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 outline-none h-8 placeholder:text-base'
								/>
							</div>

							<div>
								<label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700'>
									Phone number<span className='text-red-500'>*</span>
								</label>
								<input
									type='tel'
									id='phoneNumber'
									placeholder='Marry Doe'
									value={formData.phoneNumber}
									onChange={handleChange}
									className='w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 outline-none h-8 placeholder:text-base'
								/>
							</div>

							<div>
								<label htmlFor='email' className='block text-sm font-medium text-gray-700 '>
									Email address<span className='text-red-500'>*</span>
								</label>
								<input
									type='email'
									id='emailAddress'
									placeholder='Marry Doe'
									value={formData.emailAddress}
									onChange={handleChange}
									className='w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 outline-none h-8 placeholder:text-base'
								/>
							</div>

							<div>
								<label htmlFor='password' className='block text-sm font-medium text-gray-700 '>
									Password<span className='text-red-500'>*</span>
								</label>
								<input
									type='password'
									id='password'
									placeholder='Marry Doe'
									value={formData.password}
									onChange={handleChange}
									className='w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 outline-none h-8 placeholder:text-base'
								/>
							</div>

							<div>
								<label htmlFor='companyName' className='block text-sm font-medium text-gray-700 '>
									Company name
								</label>
								<input
									type='text'
									id='companyName'
									placeholder='Marry Doe'
									value={formData.companyName}
									onChange={handleChange}
									className='w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all duration-200 outline-none h-8 placeholder:text-base'
								/>
							</div>

							<div className='mt-6'>
								<p className='block text-sm font-medium text-gray-700 mb-2'>
									Are you an Agency?<span className='text-red-500'>*</span>
								</p>
								<div className='flex space-x-6'>
									<label className='flex items-center cursor-pointer group'>
										<div className='relative flex items-center'>
											<input
												type='radio'
												name='agency'
												value='yes'
												className='sr-only'
												checked={isAgency}
												onChange={() => setIsAgency(true)}
											/>
											<div
												className={`h-5 w-5 rounded-full border ${
													isAgency ? "border-blue-600" : "border-gray-300"
												} flex items-center justify-center mr-2 transition-all`}>
												<div
													className={`h-3 w-3 rounded-full ${
														isAgency ? "bg-blue-600" : "bg-transparent"
													} transition-all`}></div>
											</div>
										</div>
										<span className='text-sm'>Yes</span>
									</label>

									<label className='flex items-center cursor-pointer group'>
										<div className='relative flex items-center'>
											<input
												type='radio'
												name='agency'
												value='no'
												className='sr-only'
												checked={!isAgency}
												onChange={() => setIsAgency(false)}
											/>
											<div
												className={`h-5 w-5 rounded-full border ${
													!isAgency ? "border-blue-600" : "border-gray-300"
												} flex items-center justify-center mr-2 transition-all`}>
												<div
													className={`h-3 w-3 rounded-full ${
														!isAgency ? "bg-blue-600" : "bg-transparent"
													} transition-all`}></div>
											</div>
										</div>
										<span className='text-sm'>No</span>
									</label>
								</div>
							</div>
						</div>

						<div className='mt-auto pt-4'>
							<button
								type='submit'
								className='w-full bg-primary-600 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border'>
								Create Account
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
