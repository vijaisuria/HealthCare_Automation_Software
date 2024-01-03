import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NurseProfile() {
  const [nurse, setNurse] = useState({});
  const [passwords, setPasswords] = useState({});
  const [nurseId, setNurseId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("nurse");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setNurseId(foundUser.nurseId);
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
      .get(`/nurse/${nurseId}`)
      .then((response) => {
        setNurse(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Try Later");
      });
  }, [nurseId]);

  const handleSave = (event) => {
    event.preventDefault();
    if (passwords.password === passwords.confirmPassword) {
      nurse.password = passwords.password;
      axios
        .put(`/nurse/${nurseId}`, nurse)
        .then((response) => {
          console.log(response);
          toast.success("Nurse profile loaded");
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
              value={nurse.name}
              onChange={(event) =>
                setNurse({ ...nurse, name: event.target.value })
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
              value={nurse.phone}
              onChange={(event) =>
                setNurse({ ...nurse, phone: event.target.value })
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
              value={nurse.email}
              onChange={(event) =>
                setNurse({ ...nurse, email: event.target.value })
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
              value={nurse.specialization}
              onChange={(event) =>
                setNurse({ ...nurse, specialization: event.target.value })
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
              value={nurse.qualification}
              onChange={(event) =>
                setNurse({ ...nurse, qualification: event.target.value })
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

export default NurseProfile;
