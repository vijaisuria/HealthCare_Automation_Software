import React, { useState } from "react";
import axios from "../../../services/api";
import SupplierDropdown from "../supplier/dropdownSupplier";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMedicineForm = ({ onClose }) => {
  const [medicineData, setMedicineData] = useState({
    name: "",
    supplierId: "",
    expdate: "",
    countInStock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSupplierChange = (selectedOption) => {
    setMedicineData({ ...medicineData, supplierId: selectedOption.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/medicine", medicineData)
      .then((res) => {
        toast.success("Medicine added successfully");
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in adding medicine");
        // Close the modal
        onClose();
      });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form onSubmit={handleSubmit}>
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={medicineData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter medicine name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="supplier">Select Type</label>
                  <select
                    id="medicineType"
                    name="type"
                    value={medicineData.type}
                    onChange={handleChange}
                    className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option value="tablet">Tablet</option>
                    <option value="ointment">Ointment</option>
                    <option value="syrup">Syrup</option>
                    <option value="drops">Drops</option>
                    <option value="injection">Injection</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expdate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expdate"
                    id="expdate"
                    value={medicineData.expdate}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="countInStock"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    In Stock
                  </label>
                  <input
                    type="number"
                    name="countInStock"
                    id="countInStock"
                    value={medicineData.countInStock}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter quantity in stock"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add Medicine
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicineForm;
