import React, { useState, useEffect } from "react";
import axios from "../../../services/api";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrescriptionForm = () => {
  const navigate = useNavigate();
  const getCurrentIndianTime = () => {
    const now = new Date();
    const utcOffset = 5.5; // India's UTC offset is 5 hours and 30 minutes ahead of UTC.
    const indianTime = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);
    return indianTime.toISOString().slice(0, 16);
  };
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: "",
    patientRegNo: "",
    year: 0,
    age: 0,
    department: "",
    doctor: "",
    medicine: [],
    date: getCurrentIndianTime(),
    symptoms: "",
    tests: "",
    advice: "",
    nextVisit: "",
  });
  const [medicineNames, setMedicineNames] = useState([]);
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setDoctorId(foundUser.doctorId);
      setPrescriptionData({
        ...prescriptionData,
        doctor: foundUser.doctorName,
      });
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/medicine")
      .then((response) => setMedicineNames(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setPrescriptionData({
      ...prescriptionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicineChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setPrescriptionData({ ...prescriptionData, medicine: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/prescription", prescriptionData)
      .then((response) => {
        console.log(response);
        toast.success("Created successfully!!");
        setTimeout(() => {
          navigate("/prescriptions");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to push data to database");
      });
  };

  return (
    <div className="flex justify-center mt-3 font-sans">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="container rounded-2xl bg-green-400 mb-4">
            <h1 className="text-center text-2xl font-sans m-2 p-3 uppercase font-bold underline">
              Prescription Form
            </h1>
          </div>
          <div className="flex flex-wrap mt-7 mx-3 mb-5">
            <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="patientName"
              >
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={prescriptionData.patientName}
                onChange={handleChange}
                required
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="patientRegNo"
              >
                Register Number
              </label>
              <input
                type="text"
                id="patientRegNo"
                name="patientRegNo"
                value={prescriptionData.patientRegNo}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-5 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="year"
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={prescriptionData.year}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-5 md:mb-04">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={prescriptionData.age}
                onChange={handleChange}
                required
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-5 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="department"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={prescriptionData.department}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap mx-3 mb-5">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="doctor"
              >
                Doctor
              </label>
              <input
                type="text"
                id="doctor"
                name="doctor"
                value={prescriptionData.doctor}
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            {/* add today as default value in html form */}
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={prescriptionData.date}
              onChange={handleChange}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="symptoms"
            >
              Symptoms
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={prescriptionData.symptoms}
              onChange={handleChange}
              required
              rows="4"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="medicine"
            >
              Medicine
            </label>
            <select
              id="medicine"
              name="medicine"
              multiple
              value={prescriptionData.medicine}
              onChange={handleMedicineChange}
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            >
              {medicineNames.map((medicineName) => (
                <option key={medicineName._id} value={medicineName.name}>
                  {medicineName.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="tests"
            >
              Tests (If any)
            </label>
            <textarea
              id="tests"
              name="tests"
              value={prescriptionData.tests}
              onChange={handleChange}
              rows="4"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="advice"
            >
              Advice
            </label>
            <textarea
              id="advice"
              name="advice"
              value={prescriptionData.advice}
              onChange={handleChange}
              rows="4"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nextVisit"
            >
              Next Visit
            </label>
            <input
              type="date"
              id="nextVisit"
              name="nextVisit"
              value={prescriptionData.nextVisit}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="bg-blue-500 text-white font-medium py-2 px-3 rounded w-full mx-3 m-5 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PrescriptionForm;
