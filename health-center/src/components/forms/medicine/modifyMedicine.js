import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicineModifyForm = ({ medicineId, onClose }) => {
  const navigate = useNavigate();
  const [newStockCount, setNewStockCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    supplierId: "",
    expdate: "",
    countInStock: 0,
  });

  useEffect(() => {
    // Fetch the medicine details from the backend API based on the medicineId
    if (medicineId) {
      axios
        .get(`/medicine/${medicineId}`)
        .then((response) => {
          const medicineData = response.data;
          setFormData({
            name: medicineData.name,
            supplierId: medicineData.supplierId,
            expdate: new Date(medicineData.expdate).toISOString().slice(0, 10),
            countInStock:
              parseFloat(medicineData.countInStock) + parseInt(newStockCount),
          });
        })
        .catch((error) => {
          console.error("Error fetching medicine details:", error);
        });
    }
  }, [medicineId, newStockCount]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the medicine details in the backend API based on the medicineId
    if (medicineId) {
      axios
        .put(`/medicine/${medicineId}`, formData)
        .then((response) => {
          console.log(response);
          toast.success("Medicine details updated successfully");
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.error("Error updating medicine details:", error);
          // Handle error (e.g., show error message)
          toast.error("Something went wrong while updating medicine details");
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Modify Medicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expdate" className="block font-semibold mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              name="expdate"
              id="expdate"
              value={formData.expdate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="countInStock" className="block font-semibold mb-2">
              In Stock (Existing)
            </label>
            <input
              type="number"
              name="countInStock"
              id="countInStock"
              disabled
              value={formData.countInStock}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="countInStock" className="block font-semibold mb-2">
              Stock Count
            </label>
            <input
              type="number"
              name="newStock"
              id="newStock"
              value={newStockCount}
              onChange={(event) => setNewStockCount(event.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicineModifyForm;
