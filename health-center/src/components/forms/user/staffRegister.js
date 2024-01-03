import React, { useState } from "react";
import axios from "../../../services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    staffId: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    department: "AEROSPACE",
    agreeToTerms: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/staffs/register", formData);
      console.log("Registration successful:", response.data);
      setFormData({
        name: "",
        staffId: "",
        phone: "",
        email: "",
        dob: "",
        gender: "",
        department: "AEROSPACE",
        agreeToTerms: true,
      });
      toast.success("Registered successfully!");
      alert("Contact the administartor to verify your account!!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-blue-300 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg mx-auto mt-8 p-4 bg-blue-100 shadow-lg rounded-lg">
        <header className="mb-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/3/3b/Madras_Institute_of_Technology_logo.png"
              alt="MIT"
              className="w-24 h-16 mr-2" // Adjust width and height as needed
            />
            <div>
              <h1 className="text-3xl font-semibold text-red-700">
                MIT HEALTHCARE AUTOMATION SOFTWARE
              </h1>
              <h2 className="text-xl font-semibold text-blue-700">
                STAFF SELF REGISTRATION FORM
              </h2>
            </div>
          </div>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit} method="post">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block font-semibold">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="staffId" className="block font-semibold">
                Staff Id:
              </label>
              <input
                type="text"
                id="staffId"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block font-semibold">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="dob" className="block font-semibold">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Gender:</label>
            <div>
              <label className="mr-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  className="mr-1"
                />
                Male
              </label>
              <label className="mr-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  className="mr-1"
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={handleChange}
                  className="mr-1"
                />
                Others
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="department" className="block font-semibold">
              Department:
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="AEROSPACE">AEROSPACE</option>
              <option value="AUTOMOBILE">AUTOMOBILE</option>
              <option value="ELECTRONICS">ELECTRONICS</option>
              <option value="ELECTRONICS AND INSTRUMENTATION">
                ELECTRONICS AND INSTRUMENTATION
              </option>
              <option value="COMPUTER TECHNOLOGY">COMPUTER TECHNOLOGY</option>
              <option value="INFORMATION TECHNOLOGY">
                INFORMATION TECHNOLOGY
              </option>
              <option value="RUBBER AND PLASTICS TECHNOLOGY">
                RUBBER AND PLASTICS TECHNOLOGY
              </option>
              <option value="PRODUCTION TECHNOLOGY">
                PRODUCTION TECHNOLOGY
              </option>
              <option value="APPLIED SCIENCE AND HUMANITIES">
                APPLIED SCIENCE AND HUMANITIES
              </option>
              <option value="ARTIFICIAL INTELLIGENCE AND DATA SCIENCES">
                ARTIFICIAL INTELLIGENCE AND DATA SCIENCES
              </option>
              <option value="ARTIFICIAL INTELLIGENCE AND DATA SCIENCES">
                COMPUTER CENTRE
              </option>
              <option value="ROBOTICS">ROBOTICS</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="agreeToTerms">
              I agree to the terms and conditions
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StaffRegistrationForm;
