import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useParams } from "react-router-dom";
import "../pdf/pdf.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Prescription() {
  const [prescription, setPrescriptionData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/prescription/${id}`)
      .then((response) => setPrescriptionData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDetailsClick = (prescription) => {
    window.print();
  };

  const parsedMedicine = prescription.medicine
    ? JSON.parse(prescription.medicine)
    : [];

  return (
    <>
      <header className="bg-white shadow hidden">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="w-1/4 mr-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png"
              alt="Company Logo"
              className="object-contain h-12"
            />
          </div>
          <div className="w-3/4 text-center">
            <h1 className="text-lg font-bold">MIT HEALTH CENTER</h1>
            <p className="text-gray-500">
              MIT Annexe Rd, Nehru Nagar, Chromepet, Chennai,
              <br /> Tamil Nadu 600064
            </p>
          </div>
          <div className="w-1/4 -mr-3 ml-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png"
              alt="Company Logo"
              className="object-contain h-12"
            />
          </div>
        </div>
      </header>
      <div className="flex justify-center items-center m-2">
        <div className="container mx-auto">
          <div className="bg-stone-300 rounded-lg shadow-2xl p-6 border mx-auto border-gray-300 max-w-2xl">
            <div className="flex flex-col">
              <button
                onClick={handleDetailsClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 pdf rounded m-2"
              >
                Download as PDF
              </button>
              <p className="font-bold my-2">
                Name:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.patientName}
                </span>
              </p>
              <p className="font-bold my-2">
                Reg No:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.patientRegNo}
                </span>
              </p>
              <p className="font-bold my-2">
                Year:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.year == ""
                    ? "-------------"
                    : prescription.year}
                </span>
              </p>
              <p className="font-bold my-2">
                Age:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.age}
                </span>
              </p>
              <p className="font-bold my-2">
                Department:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.department == ""
                    ? "-------------"
                    : prescription.department}
                </span>
              </p>
              <p className="font-bold my-2">
                Doctor:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.doctorId}
                </span>
              </p>
              <p className="font-bold my-2">
                Date:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {new Date(prescription.date).toLocaleDateString("en-GB") +
                    " " +
                    new Date(prescription.date).toLocaleTimeString("en-GB")}
                </span>
              </p>
              <p className="font-bold my-2">Medicine:</p>
              {parsedMedicine.length > 0 ? (
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Type</th>
                      <th className="border p-2">Dosage</th>
                      <th className="border p-2">Food</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedMedicine.map((med, index) => (
                      <tr key={index}>
                        <td className="border p-2">{med.name}</td>
                        <td className="border p-2">{med.type}</td>
                        <td className="border p-2">{med.dosage}</td>
                        <td className="border p-2">{med.food}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No medicines available</p>
              )}
              <p className="font-bold my-2">
                Symptoms:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.symptoms == ""
                    ? "-------------"
                    : prescription.symptoms}
                </span>
              </p>
              <p className="font-bold my-2">
                Tests:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.tests == ""
                    ? "-------------"
                    : prescription.tests}
                </span>
              </p>
              <p className="font-bold my-2">
                Advice:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {prescription.advice == ""
                    ? "-------------"
                    : prescription.advice}
                </span>
              </p>
              <p className="font-bold my-2">
                Next Visit:{" "}
                <span className="border p-2 bg-gray-100 float-right w-64 rounded-md font-normal">
                  {
                    //display '-------------' if nextVisit is not set
                    prescription.nextVisit === null
                      ? "-------------"
                      : new Date(prescription.nextVisit).toLocaleDateString(
                          "en-GB"
                        ) +
                        " " +
                        new Date(prescription.nextVisit).toLocaleTimeString(
                          "en-GB"
                        )
                  }
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <section
        id="foot"
        className="bg-gray-900 hidden text-white py-4 bottom-0 fixed"
      >
        <div className="flex items-center justify-center text-center w-full flex-wrap">
          <FontAwesomeIcon
            icon={faCheck}
            className="text-green-500 fa-3x mx-2 flex
            items-center
            justify-center
            text-center
            w-full
            flex-wrap"
          />
          <p className="text-lg font-bold">
            This receipt is digitally signed and does not require any seal or
            signature
          </p>
          <p className="text-lg font-bold mx-4"></p>
          <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
          <p className="text-lg font-bold mx-4">|</p>
          <p className="text-lg font-bold">Chrompet, Chennai</p>
        </div>
      </section>
    </>
  );
}

export default Prescription;
