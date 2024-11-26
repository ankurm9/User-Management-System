import React, { useState } from 'react';
import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          {/* Name - Responsive Text Size */}
          <div className="flex items-center space-x-2 sm:space-x-4 ml-14">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              <span className="text-gray-700 dark:text-gray-200">
                Admin Dashboard
              </span>
            </h1>
          </div>
          
          {/* Profile Icon - Responsive Layout */}
          <div className="flex items-center">
            <button
              onClick={openLoginPopup}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
              <div className="relative px-2 sm:px-3 py-2 sm:py-3 bg-white dark:bg-gray-800 rounded-full flex items-center space-x-2 transition duration-200 group-hover:shadow-lg">
                <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
                <span className="hidden sm:inline-block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                  Profile
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative w-[90%] max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 mx-4 animate-fade-in">
            {/* Close Button */}
            <button 
              onClick={closeLoginPopup}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Popup Content */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                Not Logged In
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You need to log in to access your profile and dashboard features.
              </p>
              
              <div className="flex flex-col space-y-3">
                <button 
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition"
                  onClick={closeLoginPopup}
                >
                  Log In
                </button>
                <button 
                  className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  onClick={closeLoginPopup}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;