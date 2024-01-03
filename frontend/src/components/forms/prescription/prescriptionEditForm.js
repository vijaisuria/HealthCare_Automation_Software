import React, { useState, useEffect } from "react";
import axios from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrescriptionEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: "",
    patientRegNo: "",
    year: "",
    age: 0,
    department: "",
    doctor: "",
    medicine: medicines,
    date: "",
    symptoms: "",
    tests: "",
    advice: "",
    nextVisit: "",
    spo2: 0,
    heartRate: 0,
    bloodPressure: 0,
  });

  const [newMedicine, setNewMedicine] = useState({
    type: "tablet",
    name: "",
    dosage: "BD",
    food: "before",
  });

  const [medicineNames, setMedicineNames] = useState([]);
  const addMedicine = () => {
    if (newMedicine.name) {
      setMedicines([...medicines, { ...newMedicine }]);
      setPrescriptionData((prevData) => ({
        ...prevData,
        medicine: medicines,
      }));
      setNewMedicine({
        type: "tablet",
        name: "",
        dosage: "BD",
        food: "before",
      });
    }
  };
  const removeMedicine = (index) => {
    setMedicines((prevMedicines) => {
      const updatedMedicines = [...prevMedicines];
      updatedMedicines.splice(index, 1);
      return updatedMedicines;
    });
  };
  const getMedicineNamesByType = (type) => {
    return medicineNames.filter((medicine) => medicine.type === type);
  };

  const getIndianTime = (date) => {
    const utcDate = new Date(date);
    if (isNaN(utcDate)) return "";
    const utcOffset = 5.5; // India's UTC offset is 5 hours and 30 minutes ahead of UTC.
    const indianTime = new Date(utcDate.getTime() + utcOffset * 60 * 60 * 1000);
    return indianTime.toISOString().slice(0, 16);
  };

  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setDoctorId(foundUser.doctorId);
      setPrescriptionData((prevData) => ({
        ...prevData,
        doctor: foundUser.doctorName,
      }));
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/medicine/all")
      .then((response) => setMedicineNames(response.data))
      .catch((error) => console.log(error));

    axios
      .get(`/prescription/${id}`)
      .then((response) => {
        setPrescriptionData(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    if (medicineNames.length > 0) {
      addMedicine();
    }
  }, [medicineNames]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicine: JSON.stringify(medicines),
    }));

    console.log(prescriptionData);
    console.log(typeof medicines);

    console.log(typeof medicines[0]);

    if (prescriptionData.medicine.length === 0) {
      toast.error("Please add atleast one medicine");
      return;
    }
    axios
      .put(`/prescription/response/${id}`, prescriptionData)
      .then((response) => {
        console.log(response);
        toast.success("Updated successfully!!");
        setTimeout(() => {
          navigate("/doctor/prescriptions");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to update data to the database");
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
                disabled
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
                disabled
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
                type="text"
                id="year"
                name="year"
                value={prescriptionData.year}
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-5 md:mb-04">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="age"
              >
                Age / Gender
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={prescriptionData.age + " / " + prescriptionData.gender}
                disabled
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
                disabled
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
                Consulting Doctor
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
            <label htmlFor="spo2" className="block font-medium mb-2">
              SpO₂ (%)
            </label>
            <input
              type="number"
              id="spo2"
              value={prescriptionData.spo2}
              disabled
              className="bg-gray-200 px-4 py-2 rounded w-full"
            />
          </div>
          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label htmlFor="heartRate" className="block font-medium mb-2">
              Heart Rate (per min)
            </label>
            <input
              type="number"
              id="heartRate"
              value={prescriptionData.heartRate}
              disabled
              className="bg-gray-200 px-4 py-2 rounded w-full"
            />
          </div>
          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label htmlFor="bloodPressure" className="block font-medium mb-2">
              Blood Pressure (mmHg)
            </label>
            <input
              type="text"
              id="bloodPressure"
              value={prescriptionData.bloodPressure}
              disabled
              className="bg-gray-200 px-4 py-2 rounded w-full"
            />
          </div>
          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label htmlFor="temperature" className="block font-medium mb-2">
              Temperature (°F)
            </label>
            <input
              type="number"
              id="temperature"
              value={prescriptionData.temperature}
              disabled
              className="bg-gray-200 px-4 py-2 rounded w-full"
            />
          </div>

          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={getIndianTime(prescriptionData.date)}
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
              Complaints
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
            <h2 className="text-2xl font-semibold mb-4">Prescriptions</h2>
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-1/4 px-3 mb-5">
                <label
                  htmlFor="medicineType"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Type of Medicine
                </label>
                <select
                  id="medicineType"
                  name="type"
                  value={newMedicine.type}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, type: e.target.value })
                  }
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option value="tablet">Tablet</option>
                  <option value="ointment">Ointment</option>
                  <option value="syrup">Syrup</option>
                  <option value="drops">Drops</option>
                  <option value="injection">Injection</option>
                </select>
              </div>

              <div className="w-full md:w-1/4 px-3 mb-5">
                <label
                  htmlFor="medicineName"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Medicine Name
                </label>
                <select
                  id="medicineName"
                  name="name"
                  value={newMedicine.name}
                  onChange={(e) => {
                    setNewMedicine({ ...newMedicine, name: e.target.value });
                  }}
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option value="">Select Medicine</option>
                  {getMedicineNamesByType(newMedicine.type).map((medicine) => (
                    <option key={medicine.id} value={medicine.name}>
                      {medicine.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full px-3 md:w-1/4 mb-5">
                <label
                  htmlFor="medicineDosage"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Dosage
                </label>
                <select
                  id="medicineDosage"
                  name="dosage"
                  value={newMedicine.dosage}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, dosage: e.target.value })
                  }
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option value="BD">BD</option>
                  <option value="OD">OD</option>
                  <option value="TDS">TDS</option>
                  <option value="qid">qid</option>
                  <option value="HS">HS</option>
                </select>
              </div>

              <div className="w-full px-3 md:w-1/4 mb-5">
                <label
                  htmlFor="medicineFood"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Before / After
                </label>
                <select
                  id="medicineFood"
                  name="food"
                  value={newMedicine.food}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, food: e.target.value })
                  }
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option value="before">Before</option>
                  <option value="after">After</option>
                </select>
              </div>

              <div className="w-full px-3">
                <button
                  type="button"
                  onClick={addMedicine}
                  className="bg-blue-500 text-white font-medium py-2 px-3 rounded hover:bg-blue-600 mr-3"
                >
                  Add Medicine
                </button>
              </div>
            </div>

            {/* Medicines Table */}
            <div className="mt-4">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Medicine Name</th>
                    <th className="px-4 py-2">Dosage</th>
                    <th className="px-4 py-2">Before / After Food</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{medicine.type}</td>
                      <td className="border px-4 py-2">{medicine.name}</td>
                      <td className="border px-4 py-2">{medicine.dosage}</td>
                      <td className="border px-4 py-2">{medicine.food}</td>
                      <td className="border px-4 py-2">
                        <button
                          type="button"
                          onClick={() => removeMedicine(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap mx-3 px-3 mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="tests"
            >
              Tests / Investigations (If any)
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

export default PrescriptionEditForm;
