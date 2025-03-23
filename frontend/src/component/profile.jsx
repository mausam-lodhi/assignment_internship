import React, { useEffect, useState } from "react";
import { FaCamera, FaSignOutAlt } from "react-icons/fa"; // Import logout icon
import api from "../services/api"; // Import API service
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Profile = () => {
	const { currentUser, logout } = useAuth(); // Get current user and logout function from AuthContext
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate(); // Initialize useNavigate

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await api.getProfile(); // Fetch profile data
				const user = data.find((user) => user.emailAddress === currentUser?.emailAddress); // Match current user
				setUserData(user);
			} catch (error) {
				console.error("Error fetching profile:", error);
			} finally {
				setLoading(false);
			}
		};
		if (currentUser) {
			fetchProfile();
		} else {
			setLoading(false);
			navigate("/");
		}
	}, [currentUser, navigate]);

	const handleLogout = () => {
		logout(); // Call logout function
		navigate("/"); // Redirect to login page
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl'>Loading...</div>
			</div>
		);
	}

	if (!userData) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl'>No user data found</div>
			</div>
		);
	}

	return (
		<div id='webcrumbs'>
			<div className='flex justify-center items-center min-h-screen '>
				<div className=' rounded-lg shadow-md overflow-hidden w-full  max-w-[370px] h-[90vh]'>
					<div className=' '>
						<div className='flex justify-between items-center mb-6 p-2'>
							<h2 className='text-xl font-semibold'>Account Settings</h2>
							<FaSignOutAlt onClick={handleLogout} className='text-red-600 cursor-pointer hover:text-red-700 transition-all duration-300' title='Logout' />
						</div>
						<div className=' w-full pt-5 pb-5 p-4'>
							<div className='mb-6 '>
								<div className='relative flex items-center group'>
									<div className='relative mr-4'>
										<img
											src='https://randomuser.me/api/portraits/women/65.jpg'
											alt='Profile'
											className='w-20 h-20 rounded-full object-cover border-2 border-primary-300 transition-all duration-300 group-hover:border-primary-500'
										/>
									</div>
									<div>
										<h3 className='font-semibold text-lg'>{userData.fullName}</h3>
										<p className=' font-semibold text-sm'>{userData.emailAddress}</p>
									</div>
								</div>
							</div>

							<div className='mt-4 text-sm text-gray-600 '>
								<p className='font-semibold'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam natoque erismod tempor imperdiet ut labore et dolore magna
									aliquyam erat, sed diam.
								</p>
							</div>
						</div>

						{/* Next: "Add dark mode toggle switch" */}
						{/* Next: "Add profile completion progress bar" */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
