import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Preloader } from "../window/preloader";

const NurseDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [nurseNames, setNurseNames] = useState({});
  const [doctorNames, setDoctorNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const [nurseId, setNurseId] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [flag, setFlag] = useState(false);
  const [showTodaysRequests, setShowTodaysRequests] = useState(false);

  const [showCompletedRequests, setShowCompletedRequests] = useState(false);

  const handleToggleCompleted = () => {
    setShowCompletedRequests((prevState) => !prevState);
  };

  const handleToggleTodaysRequests = () => {
    setShowTodaysRequests((prevState) => !prevState);
  };

  const getIndianTime = (now) => {
    const utcOffset = 5.5; // India's UTC offset is 5 hours and 30 minutes ahead of UTC.
    const indianTime = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);
    return indianTime.toISOString().slice(0, 10);
  };

  // Function to filter requests based on completed status
  const getFilteredRequests = () => {
    let filteredRequests = requests;

    if (showCompletedRequests) {
      filteredRequests = filteredRequests.filter(
        (request) =>
          request.isCompleted &&
          request.date.toString().slice(0, 10) === getIndianTime(new Date())
      );
    } else {
      filteredRequests = filteredRequests.filter(
        (request) => !request.isCompleted
      );
    }

    if (showTodaysRequests) {
      filteredRequests.map((request) => {
        console.log(request.patientName, request.date);
      });
      filteredRequests = filteredRequests.filter(
        (request) =>
          request.date.toString().slice(0, 10) === getIndianTime(new Date())
      );
    }

    return filteredRequests;
  };

  // Function to show the delete confirmation modal
  const showDeleteConfirmation = (requestId, flag) => {
    setSelectedRequestId(requestId);
    setFlag(flag);
    setShowConfirmation(true);
  };

  // Function to hide the delete confirmation modal and reset the selectedRequestId
  const hideDeleteConfirmation = () => {
    setSelectedRequestId(null);
    setShowConfirmation(false);
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

  useEffect(() => {
    axios
      .get("/prescription")
      .then((response) => {
        setRequests(response.data);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching nurse requests:", error);
        setIsLoading(false); // Set isLoading to false even if there's an error
      });
  }, []);

  const handleDelete = (requestId, flag) => {
    if (flag === true) {
      toast.error("Can't delete the completed request");
      return;
    } else {
      axios
        .delete(`/prescription/${requestId}`)
        .then((response) => {
          toast.success("Request deleted");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong while deleting nurse profile");
        });
    }
  };

  // Function to fetch nurse name by ID from the backend API
  const fetchNurseName = async (nurseId) => {
    if (nurseId) {
      try {
        const response = await axios.get(`/nurse/${nurseId}`);
        const nurseName = response.data.name;
        setNurseNames((prevNames) => ({ ...prevNames, [nurseId]: nurseName }));
      } catch (error) {
        console.error("Error fetching nurse name:", error);
      }
    }
  };

  // Function to fetch doctor name by ID from the backend API
  const fetchDoctorName = async (doctorId) => {
    try {
      const response = await axios.get(`/doctor/${doctorId}`);
      const doctorName = response.data.name;
      setDoctorNames((prevNames) => ({ ...prevNames, [doctorId]: doctorName }));
    } catch (error) {
      console.error("Error fetching doctor name:", error);
    }
  };

  useEffect(() => {
    requests.forEach((request) => {
      if (!nurseNames[request.nurseId]) {
        fetchNurseName(request.nurseId);
      }
      if (!doctorNames[request.doctorId]) {
        fetchDoctorName(request.doctorId);
      }
    });
  }, [requests, nurseNames, doctorNames]);

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Requets Panel</h1>

        <div className="flex items-center mb-8">
          <h2 className="text-lg font-semibold">Pending Request</h2>
          <label className="ml-4 flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500"
              checked={showCompletedRequests}
              onChange={handleToggleCompleted}
            />
            <span className="ml-2 text-gray-700">Today's Completed</span>
          </label>
          <label className="ml-4 flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500"
              checked={showTodaysRequests}
              onChange={handleToggleTodaysRequests}
            />
            <span className="ml-2 text-gray-700">Today's Pending</span>
          </label>
        </div>

        {isLoading ? (
          <Preloader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredRequests().map((request) => (
              <div
                key={request._id}
                className="shadow-md relative rounded-md p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer flex"
              >
                {/* Patient Profile Image */}
                <div className="w-1/3 pr-4">
                  <img
                    src={
                      request.profilePicture
                        ? `http://localhost:5000/${request.profilePicture}`
                        : "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
                    }
                    alt={request.patientName}
                    className="w-full h-auto rounded-md"
                  />
                </div>

                {/* Patient Details */}
                <div className="w-2/3">
                  {/* Patient Name */}
                  <h2 className="text-2xl font-semibold mb-2">
                    {request.patientName}
                  </h2>
                  {/* Assigned by Nurse */}
                  <p className="text-gray-500 font-semibold mb-1">
                    Assigned by: {nurseNames[request.nurseId] || "Loading..."}
                  </p>
                  {/* Assigned to Doctor */}
                  <p className="text-gray-500 font-semibold mb-1">
                    Assigned to: {doctorNames[request.doctorId] || "Loading..."}
                  </p>
                  {/* Patient Age and Date */}
                  <p className="text-gray-600 mb-2">
                    Age: {request.age} | Date:{" "}
                    {new Date(request.date).toLocaleString()}
                  </p>

                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    <button
                      className="w-8 h-8 bg-red-500 hover:bg-red-700 text-white rounded-full focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        showDeleteConfirmation(
                          request._id,
                          request.isCompleted
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur">
            <div className="bg-white p-6 max-w-md rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                Delete Confirmation
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this request?
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={hideDeleteConfirmation}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => {
                    handleDelete(selectedRequestId, flag);
                    hideDeleteConfirmation();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseDashboard;
