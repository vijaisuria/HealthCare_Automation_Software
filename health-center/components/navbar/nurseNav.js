import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NurseNavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("nurse");
    toast.warning("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const toggleNavigation = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <nav className="bg-stone-900 text-white">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png"
              alt="Company Logo"
              className="w-16 h-16 mr-2"
            />
            <span className="text-xl pl-1">MIT-HC</span>
          </a>
          <div className="hidden md:flex items-center space-x-4">
            <a href="/nurse" className="hover:text-gray-300">
              Home
            </a>
            <a href="/nurse/requests" className="hover:text-gray-300">
              Requests
            </a>
            <a href="/nurse/prescriptions" className="hover:text-gray-300">
              Prescriptions
            </a>
            <a href="/nurse/profile" className="hover:text-gray-300">
              Profile
            </a>
            <button
              onClick={handleSignOut}
              className="block text-gray-300 hover:text-white"
            >
              Logout
            </button>
            <a href="/nurse/create">
              <button className="flex items-center justify-center px-4 py-2 hover:bg-blue-900 bg-blue-700 text-white rounded-md">
                Create
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 pl-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleNavigation}
              className="flex items-center justify-center bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white rounded-full w-10 h-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isExpanded ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="md:hidden">
            <div className="px-2 py-4 space-y-2 bg-black">
              <a href="/" className="block text-gray-300 hover:text-white">
                Home
              </a>
              <a href="/nurse/requests" className="hover:text-gray-300">
                Requests
              </a>
              <a
                href="/nurse/prescriptions"
                className="block text-gray-300 hover:text-white"
              >
                Prescriptions
              </a>
              <a
                href="/nurse/profile"
                className="block text-gray-300 hover:text-white"
              >
                Profile
              </a>
              <button
                onClick={handleSignOut}
                className="block text-gray-300 hover:text-white"
              >
                Logout
              </button>

              <div className="flex items-center justify-center">
                <a href="/nurse/create">
                  <button className="flex items-center justify-center px-4 py-2 hover:bg-blue-900 bg-blue-700 text-white rounded-md">
                    Create
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 pl-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </nav>
      <Outlet />
    </>
  );
};

export default NurseNavBar;
