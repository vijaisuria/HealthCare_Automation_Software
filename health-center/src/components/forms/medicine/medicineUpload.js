import React, { useState } from "react";
import axios from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicineUploadForm = () => {
  const [file, setFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Show confirmation modal
    setShowConfirmation(true);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/file", formData);
      toast.success("File uploaded successfully!");

      const loggedInUser = localStorage.getItem("admin");
      const foundUser = JSON.parse(loggedInUser);

      await axios.post("/auth/admin-logs", {
        adminUsername: foundUser.adminId,
        action: "medicine upload",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }

    // Hide confirmation modal
    setShowConfirmation(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        className="bg-gray-300 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Choose a file:
          </label>
          <span className="text-red-600 md-4">
            Note: Your file must have an extension of <strong>.xlsx</strong>{" "}
            with headers as name, supplierId, countInStock, expdate. <br /> If
            you want a demo sample, please{" "}
            <a
              href={"/med.xlsx"}
              className="font-bold italic text-yellow-600 underline"
            >
              click here
            </a>
          </span>
          <input
            className="shadow mt-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
      <ToastContainer />
      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-yellow-500"
                      aria-hidden="true"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm0-8v-4m0 4h.01"
                      ></path>
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      ></circle>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Are you sure you want to proceed?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your file will be uploaded to the server and processed.
                        This may take some time depending on the size of the
                        file.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpload}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineUploadForm;
