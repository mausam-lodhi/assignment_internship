import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
	const navigate = useNavigate();

	return (
		<div id='webcrumbs' className='flex items-end lg:items-center justify-center min-h-screen min-w-full'>
			<div className='flex items-center justify-center bg-gradient-to-b w-full min-h-screen'>
				<div className='rounded-xl shadow-lg overflow-hidden max-w-[370px] w-full mb-5 lg:mb-0 h-[90vh] flex flex-col justify-between'>
					<div className='flex items-center justify-center'>{/* Next: "Add company logo" */}</div>

					<div className='p-4 w-full'>
						<h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome to PopX</h1>
						<p className='text-gray-500 mb-6 font-normal text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

						<button
							onClick={() => navigate("/register")}
							className='w-full py-3 mb-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-all duration-200 transform hover:scale-[1.01] hover:shadow-md'>
							Create Account
						</button>

						<button
							onClick={() => navigate("/log-in")}
							className='w-full py-3 bg-purple-200 hover:bg-purple-300 text-purple-700 font-medium rounded-md transition-all duration-200 transform hover:scale-[1.01]'>
							Already Registered? Login
						</button>
						{/* Next: "Add social login options" */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainPage;
