import React, { useState, useEffect } from "react";
import axios from "../../../services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const VerificationForm = () => {
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState({
    registerNumber: "",
    verificationCode: "",
  });

  const [verifiedBy, setVerifiedBy] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationData({ ...verificationData, [name]: value });
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();

    // Implement your verification logic here, e.g., send a request to the API

    // Assuming you have verified the student successfully
    // Update the verification status in your API

    // Reset the form data
    setVerificationData({
      registerNumber: "",
      verificationCode: "",
    });
  };

  // Retrieve the verifiedBy value from localStorage
  useEffect(() => {
    const verifiedBy = localStorage.getItem("admin");
    if (verifiedBy !== null) {
      const foundUser = JSON.parse(verifiedBy);
      setVerifiedBy(foundUser);
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, []);

  return (
    <div className="container min-h-screen flex items-center ">
      <div className="w-90 md:w-1/3 mx-auto mt-8 p-4  bg-blue-300 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-4 text-center text-white">
          Student Verification
        </h1>
        <form className="space-y-4 w-full" onSubmit={handleVerificationSubmit}>
          <div>
            <label htmlFor="registerNumber" className="block font-semibold">
              Register Number:
            </label>
            <input
              type="text"
              id="registerNumber"
              name="registerNumber"
              value={verificationData.registerNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="verificationCode" className="block font-semibold">
              Verification Code:
            </label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={verificationData.verificationCode}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Verify
            </button>
          </div>
          <div className="mt-4">
            <p className="text-center">
              Verified by: {verifiedBy.adminId || "Admin Not Found"} <br />
              Verification ID: {verifiedBy.adminNo || "Admin Not Found"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
