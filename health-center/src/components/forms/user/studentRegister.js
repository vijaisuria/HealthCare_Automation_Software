import React, { useState } from "react";
import axios from "../../../services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Preloader } from "../../window/preloader";

const StudentRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    programme: "UG",
    department: "AEROSPACE",
    agreeToTerms: true,
    residence: "hosteller",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/students/register", formData);
      console.log("Registration successful:", response.data);
      setFormData({
        name: "",
        registerNumber: "",
        phone: "",
        email: "",
        dob: "",
        gender: "",
        programme: "UG",
        department: "AEROSPACE",
        residence: "hosteller",
        agreeToTerms: false,
      });
      toast.success("Registered successfully!");
      setIsModalVisible(true);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center p-4">
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
                STUDENT SELF REGISTRATION FORM
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
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="registerNumber" className="block font-semibold">
                Register Number:
              </label>
              <input
                type="number"
                id="registerNumber"
                name="registerNumber"
                value={formData.registerNumber}
                required
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
              required
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
              required
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {isLoading && <Preloader />}
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
            <label htmlFor="programme" className="block font-semibold">
              Programme:
            </label>
            <select
              id="programme"
              name="programme"
              value={formData.programme}
              required
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="UG">UG</option>
              <option value="PG">PG</option>
              <option value="PHD">PHD</option>
            </select>
          </div>
          <div>
            <label htmlFor="residence" className="block font-semibold">
              Residence:
            </label>
            <select
              id="residence"
              name="residence"
              value={formData.residence}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="hosteller">Hostel</option>
              <option value="dayscholar">Dayscholar</option>
              <option value="other">Others</option>
            </select>
          </div>
          <div>
            <label htmlFor="department" className="block font-semibold">
              Department:
            </label>
            <select
              id="department"
              name="department"
              required
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
              <option value="ROBOTICS">ROBOTICS</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              required
              disabled
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="agreeToTerms">
              I agree to the{" "}
              <a
                href="#"
                target="self"
                className="text-yellow-500 font-bold underline hover:text-red-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              {" "}
              {isLoading ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>

      <div
        data-te-modal-init
        className={`fixed left-0 top-0 z-[1055] ${
          isModalVisible ? "block" : "hidden"
        } h-full w-full overflow-y-auto overflow-x-hidden outline-none`}
        id="rightBottomModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none absolute right-7 h-auto w-full translate-x-[100%] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md bg-info-600 p-4 dark:border-b dark:border-neutral-500 dark:bg-transparent">
              <h5
                className="text-xl font-medium leading-normal text-white"
                id="rightTopModalLabel"
              >
                Product in the cart
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none text-white hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="relative flex flex-auto p-4" data-te-modal-body-ref>
              <span className="text-info-600 [&>svg]:h-16 [&>svg]:w-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </span>
              <div className="ml-8">
                <p className="my-4">
                  Do you need more time to make a purchase decision?
                </p>
                <p className="my-4">
                  No pressure, your product will be waiting for you in the cart.
                </p>
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="mr-2 inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Go to the cart
              </button>
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="max-w-lg mx-auto mt-4 p-4 bg-gray-200 text-center shadow-lg rounded-lg">
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

      <ToastContainer />
    </div>
  );
};

export default StudentRegistrationForm;
