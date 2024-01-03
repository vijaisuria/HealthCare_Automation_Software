import React, { useState, useEffect } from "react";
import axios from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faSearch,
  faSort,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import MedicineModifyForm from "../../forms/medicine/modifyMedicine";
import AddMedicineForm from "../../forms/medicine/AddMedicine";
import ReactPaginate from "react-paginate";

function MedicinePage() {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [showModifyForm, setShowModifyForm] = useState(false); // State variable to control the visibility of the form overlay
  const [selectedMedicineId, setSelectedMedicineId] = useState(null); // State variable to store the ID of the medicine to be modified

  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setAdminId(foundUser.adminId);
    } else {
      toast.error("Please login first");
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    // ... (Existing code)

    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          `/medicine?page=${currentPage}&sort=${sortOption}&search=${searchTerm}`
        );
        const medicinesData = response.data;

        setMedicines(medicinesData);
        const totalMedicines = response.headers["x-total-count"];
        const totalPages = Math.ceil(parseInt(totalMedicines) / 10);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedicines();
  }, [currentPage, sortOption, searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (selectedItem) => {
    const pageNumber = selectedItem.selected + 1;
    setCurrentPage(pageNumber);
  };

  const handleDelete = (medicineId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );
    if (confirmDelete) {
      axios
        .delete(`/medicine/${medicineId}`)
        .then((response) => {
          setMedicines((prevMedicines) =>
            prevMedicines.filter((med) => med._id !== medicineId)
          );
          toast.success("Medicine deleted");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong while deleting medicine");
        });
    }
  };

  // Function to handle opening the form overlay for modifying a medicine
  const handleOpenModifyForm = (medicineId) => {
    setSelectedMedicineId(medicineId); // Store the ID of the medicine to be modified
    setShowModifyForm(true); // Show the form overlay
  };

  // Function to handle closing the form overlay
  const handleCloseModifyForm = () => {
    setSelectedMedicineId(null); // Reset the selected medicine ID
    setShowModifyForm(false); // Hide the form overlay
  };

  return (
    <div className="ml-8 lg:ml-64">
      <header className="bg-indigo-800 h-16 top-0 fixed w-full flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">MEDICINES</h1>
      </header>

      <div className="container mx-auto overflow-x-auto place-items-center font-sans flex flex-col justify-center">
        <div className="mt-32 w-128 flex items-center justify-between m-4 flex-col md:flex-row gap-4">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          >
            Add New Medicine
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between m-4 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
            <div className="relative mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search Medicine"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="px-4 py-2 border rounded-lg shadow-md w-full focus:outline-none focus:ring focus:border-blue-500"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </span>
            </div>

            <div className="relative mb-4 md:mb-0">
              <select
                value={sortOption}
                onChange={handleSortOptionChange}
                className="px-4 py-2 border rounded-lg shadow-md w-full focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="expdate">Sort by Expiry Date</option>
                <option value="type">Sort by Type</option>
                <option value="countInStock">Sort by Stock</option>
              </select>
            </div>
          </div>
          <table className=" table-auto border-collapse border-2 hover:box-shadow-2xl m-8">
            <thead>
              <tr className="p-3 font-bold uppercase bg-blue-500 border border-gray-300">
                <th className="border border-gray-300 p-3 my-2">Name</th>
                <th className="border border-gray-300 p-3 my-2">Type</th>
                <th className="border border-gray-300 p-3 my-2">Expiry</th>
                <th className="border border-gray-300 p-3 my-2">In Stock</th>
                <th className="border border-gray-300 p-3 my-2">Date</th>
                <th className="border border-gray-300 p-3 my-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr
                  key={med._id}
                  className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white"
                >
                  <td className="border border-gray-300 p-3 my-2">
                    {med.name}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {med.type}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {new Date(med.expdate).toLocaleDateString("en-GB") +
                      " " +
                      new Date(med.expdate).toLocaleTimeString("en-GB")}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {med.countInStock}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {new Date(med.createdAt).toLocaleDateString("en-GB") +
                      " " +
                      new Date(med.createdAt).toLocaleTimeString("en-GB")}
                  </td>
                  <td className="border border-gray-300 p-3 my-2 flex gap-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleDelete(med._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleOpenModifyForm(med._id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center mt-8"
            activeClassName="bg-blue-500 text-white"
            pageClassName="mx-2 rounded-full hover:bg-blue-200"
            previousClassName="mx-2 rounded-full hover:bg-blue-200"
            nextClassName="mx-2 rounded-full hover:bg-blue-200"
            breakClassName="mx-2"
            pageLinkClassName="block py-2 px-3"
            previousLinkClassName="block py-2 px-3"
            nextLinkClassName="block py-2 px-3"
            breakLinkClassName="block py-2 px-3"
          />

          {showModifyForm && (
            <MedicineModifyForm
              medicineId={selectedMedicineId}
              onClose={handleCloseModifyForm}
            />
          )}

          {showModal && <AddMedicineForm onClose={handleCloseModal} />}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default MedicinePage;
