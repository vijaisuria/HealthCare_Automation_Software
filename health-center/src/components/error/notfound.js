import React from "react";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-64 mb-4">
        {/* Replace the src attribute with the path to your hospital logo */}
        <img src="/assets/images/mit-hc-logo.png" alt="Hospital Logo" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Oops! Page not found
      </h1>
      <p className="text-gray-600 text-center">
        We are sorry, the page you are looking for could not be found.
      </p>
      <a href="/" className="underline text-red-500">
        Go to Homepage....
      </a>
    </div>
  );
};

export default Error404;
