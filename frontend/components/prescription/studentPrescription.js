import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SPrescriptions() {
  const { reg } = useParams();
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("date"); // Default sort criteria is "date"
  const navigate = useNavigate();
  const [searchDate, setSearchDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const registerNumber = useEffect(() => {
    axios
      .get(`/prescription/user/${reg}`)
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Data loading finished with an error
      });
  }, [sortCriteria, reg]);

  useEffect(() => {
    let filteredData = prescriptionData;
    if (searchDate !== "") {
      filteredData = filteredData.filter(
        (row) =>
          new Date(row.date).toLocaleDateString("en-GB") ===
          new Date(searchDate).toLocaleDateString("en-GB")
      );
    }
    setSortedData(filteredData);
  }, [prescriptionData, searchDate]);

  const handleDetailsClick = (prescription) => {
    navigate(`/prescriptions/${prescription._id}`);
  };

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
  };

  let c = 1;

  return (
    <>
      <nav class="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
        <div class="flex w-full flex-wrap items-center justify-between px-3">
          <div class="ml-2">
            <a
              class="text-xl font-semibold text-neutral-800 dark:text-neutral-200"
              href="#"
            >
              Home
            </a>
          </div>
        </div>
      </nav>
      <div className="container mx-auto overflow-x-auto font-sans flex flex-col justify-center">
        <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
          <input
            type="date"
            placeholder="Search by Date"
            className="w-1/2 sm:w-64 py-2 pl-4 pr-10 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <select
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
            className="w-1/2 px-4 py-2 border-2 border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="doctor">Sort by Doctor</option>
          </select>
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
            {isLoading ? ( // Show loading effects when data is loading
              <tr className="w-full text-3xl m-10 text-gray-700 font-bold">
                <td className="text-center m-3">Loading...</td>
              </tr>
            ) : sortedData.length === 0 ? ( // Show "No records found" if no data
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
    </>
  );
}

export default SPrescriptions;
