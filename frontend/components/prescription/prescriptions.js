import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Prescriptions() {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("date"); // Default sort criteria is "date"
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState("");
  const [nurseId, setNurseId] = useState("");
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const [myPatient, setMyPatient] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInNurse = localStorage.getItem("nurse");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setDoctorId(foundUser.doctorId);
      setDoctorName(foundUser.doctorName);
    } else if (loggedInNurse !== null) {
      const foundUser = JSON.parse(loggedInNurse);
      setNurseId(foundUser.nurseId);
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/prescription")
      .then((response) => {
        const sortedPrescriptions = response.data.sort((a, b) => {
          if (sortCriteria === "date") {
            return new Date(b.date) - new Date(a.date);
          } else if (sortCriteria === "doctor") {
            return a.doctor.localeCompare(b.doctor);
          }
        });

        // Fetch the doctor's name for each prescription
        const fetchDoctorName = async (doctorId) => {
          try {
            const doctorResponse = await axios.get(`/doctor/${doctorId}`);
            return doctorResponse.data.name;
          } catch (error) {
            console.error("Error fetching doctor:", error);
            return "";
          }
        };

        // Map through the sorted prescriptions and fetch the doctor's name
        const fetchDoctorNames = async () => {
          const prescriptionsWithDoctorName = await Promise.all(
            sortedPrescriptions.map(async (prescription) => {
              const doctorName = await fetchDoctorName(prescription.doctorId);
              return { ...prescription, doctor: doctorName };
            })
          );
          setPrescriptionData(prescriptionsWithDoctorName);
          setSortedData(prescriptionsWithDoctorName);
        };

        fetchDoctorNames();
      })
      .catch((error) => console.log(error));
  }, [sortCriteria]);

  useEffect(() => {
    let filteredData = prescriptionData;
    if (showTodayOnly) {
      const today = new Date().toLocaleDateString("en-GB");
      filteredData = prescriptionData.filter(
        (row) => new Date(row.date).toLocaleDateString("en-GB") === today
      );
    }
    if (myPatient) {
      filteredData = filteredData.filter((row) => row.doctor === doctorName);
    }
    filteredData = filteredData.filter((row) =>
      row.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchDate !== "") {
      filteredData = filteredData.filter(
        (row) =>
          new Date(row.date).toLocaleDateString("en-GB") ===
          new Date(searchDate).toLocaleDateString("en-GB")
      );
    }
    setSortedData(filteredData);
  }, [searchTerm, prescriptionData, showTodayOnly, searchDate, myPatient]);

  const handleDetailsClick = (prescription) => {
    navigate(`/prescriptions/${prescription._id}`);
  };

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleTodayOnlyClick = () => {
    setShowTodayOnly(!showTodayOnly);
  };

  const handleMyPatientClick = () => {
    setMyPatient(!myPatient);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Prescriptions");
    XLSX.writeFile(workbook, "prescriptions.xlsx");
  };

  let c = 1;

  return (
    <div className="container mx-auto overflow-x-auto font-sans flex flex-col justify-center">
      <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by patient name"
          className="w-full sm:w-64 py-2 pl-4 pr-10 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleExportToExcel}
          className="px-4 py-2 border-2 rounded bg-green-500 text-white"
        >
          Export to Excel
        </button>

        <input
          type="date"
          placeholder="Search by Date"
          className="w-full sm:w-64 py-2 pl-4 pr-10 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <select
          value={sortCriteria}
          onChange={handleSortCriteriaChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="doctor">Sort by Doctor</option>
        </select>
        <div className="w-full flex gap-1 justify-between flex-col md:flex-row flex-wrap">
          <button
            onClick={handleTodayOnlyClick}
            className={`w-full md:w-1/3 px-4 py-2 border-2 transition-all text-white hover:scale-95 rounded ${
              showTodayOnly ? "bg-blue-500 " : "bg-indigo-700"
            }`}
          >
            {showTodayOnly ? "Today Only" : "All Dates"}
          </button>
          <button
            onClick={handleMyPatientClick}
            className={`w-full md:w-1/3 px-4 transition-all hover:scale-95 text-white py-2 border-2 rounded ${
              myPatient ? "bg-blue-500" : "bg-indigo-700"
            }`}
          >
            {myPatient ? "My patients" : "All patients"}
          </button>
        </div>
      </div>

      <table className="table-auto border-collapse hover:box-shadow-2xl m-8">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              S.No
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Date
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Patient Reg No
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Patient Name
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Age / Gender
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Department - Year
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Consulting Doctor
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Complaints
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Tests
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200  border border-gray-300 ">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr className="w-full text-3xl m-10 text-red-700 font-bold">
              <td className="text-center">No records found</td>
            </tr>
          ) : (
            sortedData.map((prescription) => (
              <tr
                key={prescription._id}
                className="text-gray-600 transition-all hover:bg-slate-500 hover:text-white"
              >
                <td className="p-3  uppercase border border-gray-300 ">
                  {c++}
                </td>
                <td className="p-3  uppercase border border-gray-300 ">
                  {new Date(prescription.date).toLocaleDateString("en-GB")}
                </td>
                <td className="p-3  uppercase  border border-gray-300 ">
                  {prescription.patientRegNo}
                </td>
                <td className="p-3  uppercase border border-gray-300 ">
                  {prescription.patientName}
                </td>
                <td className="p-3  uppercase  border border-gray-300 ">
                  {prescription.age + " / " + prescription.gender}
                </td>
                <td className="p-3  uppercase  border border-gray-300 ">
                  {prescription.department + " / " + prescription.year}
                </td>
                <td className="p-3  uppercase  border border-gray-300 ">
                  {prescription.doctor}
                </td>

                <td className="p-3  uppercase  border border-gray-300 ">
                  {prescription.symptoms}
                </td>
                <td className="p-3  uppercase  border border-gray-300 ">
                  {prescription.tests}
                </td>
                <td className="p-3  uppercase  border border-gray-300 ">
                  <button
                    onClick={() => handleDetailsClick(prescription)}
                    className={`text-white font-bold py-2 px-4 rounded ${
                      !prescription.isCompleted
                        ? "bg-red-500 hover:bg-red-700"
                        : "bg-blue-500 hover:bg-blue-700"
                    } `}
                  >
                    {prescription.isCompleted == true ? "Details" : "Pending"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Prescriptions;
