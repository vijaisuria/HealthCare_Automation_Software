import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Preloader } from "../window/preloader";

function NurseProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [nurse, setNurse] = useState({});
  const [feedback, setFeedback] = useState({});
  const [passwords, setPasswords] = useState({});
  const [nurseId, setNurseId] = useState("");
  const [image, setImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
  );
  const [nurseName, setNurseName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("nurse");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setNurseId(foundUser.nurseId);
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const onHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPasswords({ ...passwords, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`/nurse/${nurseId}`)
      .then((response) => {
        setNurse(response.data);
        if (response.data.name) setNurseName(response.data.name);
        if (response.data.profilePicture)
          setImage(response.data.profilePicture);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Try Later");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [nurseId]);

  const handleSave = (event) => {
    event.preventDefault();
    axios
      .put(`/nurse/${nurseId}`, nurse)
      .then((response) => {
        console.log(response);
        toast.success("Nurse profile updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  const handleSubmit = (event) => {
    feedback.name = nurseName;
    feedback.designation = "Nurse";
    console.log(feedback);
    event.preventDefault();
    axios
      .post("/query", feedback)
      .then((response) => {
        console.log(response);
        toast.success("Thank you for your feedback");
        setFeedback({});
      })
      .catch((error) => {
        console.log(error);
        toast.error("Try Later");
      });
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();
    if (passwords.password === passwords.confirmPassword) {
      nurse.password = passwords.password;
      console.log(nurseId);
      axios
        .put(`/nurse/${nurseId}`, nurse)
        .then((response) => {
          console.log(response);
          toast.success("Password Updated");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-300">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className="lg:w-1/3 p-4 bg-blue-100">
            <div className="text-center">
              <img
                src={image}
                alt={nurse.name}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-4">Hello, {nurseName}</h2>
            </div>
            <div className="bg-white shadow-md rounded px-4 py-4">
              <form className="bg-white shadow-md rounded px-4 py-4 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    value={nurse.email}
                    placeholder="email"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    ID
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="id"
                    type="text"
                    placeholder="id"
                    value={nurse._id}
                    disabled
                  />
                </div>
              </form>
            </div>
            <div className="bg-gray-200 shadow-md rounded px-4 py-4 my-2">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Feedback</h3>
                <form className="sm:border-solid sm:border-2 border-gray-600 bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="name"
                    >
                      Subject
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="subject"
                      type="text"
                      placeholder="Subject"
                      value={feedback.subject}
                      onChange={(event) =>
                        setFeedback({
                          ...feedback,
                          subject: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="specialization"
                    >
                      Message
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                      id="message"
                      type="text"
                      placeholder="Message"
                      style={{ resize: "none", height: "79px" }}
                      value={feedback.message}
                      onChange={(event) =>
                        setFeedback({
                          ...feedback,
                          message: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Top Section */}
          <div className="lg:w-2/3 p-4">
            <div className="bg-gray-200 shadow-md rounded px-4 py-4 mb-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Basic Details</h3>
                <form className="sm:border-solid sm:border-2 border-gray-600 bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Name"
                      value={nurse.name}
                      onChange={(event) =>
                        setNurse({ ...nurse, name: event.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="text"
                      placeholder="Phone"
                      value={nurse.phone}
                      onChange={(event) =>
                        setNurse({ ...nurse, phone: event.target.value })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="specialization"
                    >
                      Specialization
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="specialization"
                      type="text"
                      placeholder="Specialization"
                      value={nurse.specialization}
                      onChange={(event) =>
                        setNurse({
                          ...nurse,
                          specialization: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="qualification"
                    >
                      Qualification
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="qualification"
                      type="text"
                      placeholder="Qualification"
                      value={nurse.qualification}
                      onChange={(event) =>
                        setNurse({
                          ...nurse,
                          qualification: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

              {/* Password Section */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Password</h3>
                <form className="sm:border-solid sm:border-2 border-gray-600 bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={passwords.password || ""}
                      onChange={onHandleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={passwords.confirmPassword || ""}
                      onChange={onHandleChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handlePasswordUpdate}
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default NurseProfile;
