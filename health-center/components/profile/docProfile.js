import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorProfile() {
  const [doctor, setDoctor] = useState({});
  const [passwords, setPasswords] = useState({});
  const [doctorId, setDoctorId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setDoctorId(foundUser.doctorId);
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const onHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPasswords({ ...passwords, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`/doctor/${doctorId}`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Try Later");
      });
  }, [doctorId]);

  const handleSave = (event) => {
    event.preventDefault();
    if (passwords.password === passwords.confirmPassword) {
      doctor.password = passwords.password;
      axios
        .put(`/doctor/${doctorId}`, doctor)
        .then((response) => {
          console.log(response);
          toast.success("Doctor profile loaded");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="flex justify-center pt-3 bg-[url('https://media.istockphoto.com/id/940993008/vector/abstract-geometric-medical-cross-shape-medicine-and-science-concept-background.jpg?s=612x612&w=0&k=20&c=K6wREAMiRA3V-OGFDFxls9iZZCgL39kwKPxeQEUwT38=')] bg-no-repeat bg-cover">
      <div className="w-full max-w-md">
        <form className="sm:border-solid sm:border-2 border-gray-600 bg-transparent shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={doctor.name}
              onChange={(event) =>
                setDoctor({ ...doctor, name: event.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Phone"
              value={doctor.phone}
              onChange={(event) =>
                setDoctor({ ...doctor, phone: event.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={doctor.email}
              onChange={(event) =>
                setDoctor({ ...doctor, email: event.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="specialization"
            >
              Specialization
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="specialization"
              type="text"
              placeholder="Specialization"
              value={doctor.specialization}
              onChange={(event) =>
                setDoctor({ ...doctor, specialization: event.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="qualification"
            >
              Qualification
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="qualification"
              type="text"
              placeholder="Qualification"
              value={doctor.qualification}
              onChange={(event) =>
                setDoctor({ ...doctor, qualification: event.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={passwords.password || ""}
              onChange={onHandleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={passwords.confirmPassword || ""}
              onChange={onHandleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DoctorProfile;
