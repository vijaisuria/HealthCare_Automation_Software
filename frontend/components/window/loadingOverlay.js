import React from "react";
import HeartLogo from "./load.svg";

const LoadingOverlay = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-700 bg-opacity-50 z-50 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <img src={HeartLogo} alt="Loading" className="h-12 mx-auto mb-2" />
        <p className="text-gray-800 text-xl">
          Logging in for the first time on a new device may take a moment.
          Please wait.
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
