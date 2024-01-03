import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="/assets/images/mit-hc-logo.png"
              alt="MIT HEALTHCARE PLUS"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-semibold">MIT HEALTHCARE PLUS</h1>
          </div>
          <nav className=" space-x-4">
            <Link
              to="http://www.health-centre.mitindia.edu/healthCare/"
              className="text-white hover:underline"
            >
              Existing User? Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Body */}
      <main className="container mx-auto flex-grow p-4">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Welcome to MIT HEALTHCARE PLUS
        </h2>
        <p className="text-lg text-center">Choose your registration option:</p>
        <div className="flex flex-col space-y-4 mt-6">
          <Link
            to="/register/student"
            className="bg-white text-blue-500 hover:bg-blue-100 py-2 rounded-md text-center text-lg font-semibold transition duration-300"
          >
            Student Registration
          </Link>
          <Link
            to="/register/staff"
            className="bg-white text-blue-500 hover:bg-blue-100 py-2 rounded-md text-center text-lg font-semibold transition duration-300"
          >
            Staff Registration
          </Link>
        </div>
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        <p className="text-gray-600 text-sm mb-2">
          "Safety and secure digitalization for a better tomorrow."
        </p>
        <p className="text-gray-600 text-sm">
          Designed and Developed by{" "}
          <a
            href="https://health-center.vercel.app/team"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Web Team, MIT
          </a>
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage;
