import React, { useState, useEffect } from "react";
import axios from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../window/studentnotfound";

const NurseStaffRequestForm = () => {
  const getIndianTime = (now = new Date()) => {
    const utcOffset = 5.5; // India's UTC offset is 5 hours and 30 minutes ahead of UTC.
    const indianTime = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);
    return indianTime.toISOString().slice(0, 16);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registerNumber, setRegisterNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("male"); // Default value set to "male"
  const [date, setDate] = useState(getIndianTime());
  const [temperature, setTemperature] = useState("");
  const [spo2, setSpo2] = useState(""); // Changed field name to "spo2" (SpO₂)
  const [heartRate, setHeartRate] = useState(""); // New field for Heart Rate
  const [bloodPressure, setBloodPressure] = useState(""); // New field for Blood Pressure (BP)
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const navigate = useNavigate();

  // Fetch nurse ID from localStorage (assuming it was stored upon login)
  const [nurseId, setNurseId] = useState("");

  const showConfirmationWindow = () => {
    setShowConfirmation(true);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("nurse");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setNurseId(foundUser.nurseId);
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, []);

  // Fetch all doctors using the getAllDoctors API
  useEffect(() => {
    axios
      .get("/doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  const handleRegisterNumberChange = (e) => {
    setRegisterNumber(e.target.value);
  };

  // Function to fetch student details based on the register number
  const handleFetchStudentDetails = () => {
    // Call your backend API to fetch student details
    // Replace 'your-api-endpoint' with the actual API endpoint for fetching student details
    axios.get(`/students/reg/${registerNumber}`).then((response) => {
      // Check if the student exists
      const studentDetails = response.data;
      console.log(studentDetails);
      console.log(typeof studentDetails);
      if (studentDetails) {
        // Populate the fields if the student exists
        toast.success("Staff found");
        console.log(studentDetails.name);
        setPatientName(studentDetails.name);
        setDepartment(studentDetails.department);
        setGender(studentDetails.gender);
        console.log(patientName);
      } else {
        showConfirmationWindow();
      }
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      nurseId,
      doctorId: selectedDoctor,
      age,
      year,
      patientName,
      patientRegNo: registerNumber,
      department,
      gender,
      date,
      temperature,
      spo2,
      heartRate,
      bloodPressure,
    };

    // Perform API call to submit the nurse request
    axios
      .post("/prescription", requestData)
      .then((response) => {
        console.log("Request submitted:", response.data);
        toast.success("Request added");
        setRegisterNumber("");
        setPatientName("");
        setDepartment("");
        setTemperature("");
        setSpo2("");
        setHeartRate("");
        setBloodPressure("");
        setSelectedDoctor("");
        setDate(getIndianTime());
      })
      .catch((error) => {
        toast.error("Server issue");
        console.error("Error submitting request:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Nurse Request Form (For Staffs)
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nurseId" className="block font-medium mb-2">
            Nurse ID
          </label>
          <input
            type="text"
            id="nurseId"
            value={nurseId || "demo number"}
            className="bg-gray-200 px-4 py-2 rounded w-full"
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="doctor" className="block font-medium mb-2">
            Select Doctor
          </label>
          <select
            id="doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select a doctor
            </option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="patientName" className="block font-medium mb-2">
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="registerNumber" className="block font-medium mb-2">
            Faculty ID:
          </label>
          <div className="flex">
            <input
              type="text"
              id="registerNumber"
              value={registerNumber}
              onChange={handleRegisterNumberChange}
              className="bg-gray-200 px-4 py-2 rounded w-full"
              required
            />
            <button
              type="button"
              className="ml-2 bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleFetchStudentDetails}
            >
              Fetch
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="patientName" className="block font-medium mb-2">
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block font-medium mb-2">
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block font-medium mb-2">
            Gender
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block font-medium mb-2">
            Year of Study
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
            required
          >
            <option value="" disabled>
              Select year of study
            </option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block font-medium mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="spo2" className="block font-medium mb-2">
            SpO₂ (%)
          </label>
          <input
            type="number"
            id="spo2"
            value={spo2}
            onChange={(e) => setSpo2(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="heartRate" className="block font-medium mb-2">
            Heart Rate (per min)
          </label>
          <input
            type="number"
            id="heartRate"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bloodPressure" className="block font-medium mb-2">
            Blood Pressure (mmHg)
          </label>
          <input
            type="text"
            id="bloodPressure"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="temperature" className="block font-medium mb-2">
            Temperature (°F)
          </label>
          <input
            type="number"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Request
          </button>
        </div>
      </form>
      <ConfirmationModal
        isOpen={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={() => {
          setShowConfirmation(false);
        }}
      />
      <ToastContainer />
    </div>
  );
};

export default NurseStaffRequestForm;
