import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setDoctor] = useState({});

  const [delDoctor, setDelDoctor] = useState({});

  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setAdminId(foundUser.adminId);
    } else {
      toast.error("Please login first");
      navigate("/admin");
    }
  }, [adminId]);

  useEffect(() => {
    axios
      .get("/doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    axios
      .post(`/doctor`, newDoctor)
      .then((response) => {
        console.log(response);
        toast.success("Doctor profile added, Refresh the page");

        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "Doctor added",
          notes: newDoctor.email,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (!delDoctor.id) {
      toast.error("No doctor ID found.");
      return;
    }

    axios
      .delete(`/doctor/${delDoctor.id}`)
      .then((response) => {
        console.log(response);
        toast.warning("Doctor deleted successfully");

        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "doctor deleted",
          notes: delDoctor.id,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteMail = (event) => {
    event.preventDefault();

    if (!delDoctor.email) {
      toast.error("No doctor email found.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(delDoctor.email)) {
      toast.error("Invalid email format.");
      return;
    }

    axios
      .delete(`/doctor/mail/${delDoctor.email}`)
      .then((response) => {
        console.log(response);
        toast.warning("Doctor deleted successfully");
        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "doctor deleted",
          notes: delDoctor.email,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      });
  };

  return (
    <div className="ml-8 lg:ml-64">
      <ToastContainer />
      <header className="bg-indigo-800 h-16 top-0 fixed w-full flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">DOCTORS</h1>
      </header>
      <div className="flex flex-col">
        <div className="container mx-auto overflow-x-auto font-sans flex place-items-center flex-col justify-center">
          <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
            <table className="mt-32 table-auto border-collapse border-2 hover:box-shadow-2xl m-8">
              <thead>
                <tr className="p-3 font-bold uppercase bg-blue-500 border border-gray-300">
                  <th className="border border-gray-300 p-3 my-2">Name</th>
                  <th className="border border-gray-300 p-3 my-2">Email</th>
                  <th className="border border-gray-300 p-3 my-2">Phone</th>
                  <th className="border border-gray-300 p-3 my-2">
                    Specialization
                  </th>
                  <th className="border border-gray-300 p-3 my-2">
                    Qualification
                  </th>
                  <th className="border border-gray-300 p-3 my-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white  uppercase  "
                  >
                    <td className="border border-gray-300 p-3 my-2">
                      {doctor.name}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {doctor.email}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {doctor.phone}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {doctor.specialization}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {doctor.qualification}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {new Date(doctor.date).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-5">
          <div className="w-full max-w-md">
            <form className="sm:border-solid sm:border-2 border-gray-600 bg-transparent shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
              <fieldset>
                <legend className="text-green-800 font-bold text-center text-2xl">
                  ADD DOCTOR
                </legend>
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
                    value={newDoctor.name}
                    required
                    onChange={(event) =>
                      setDoctor({ ...newDoctor, name: event.target.value })
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
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    placeholder="Phone"
                    value={newDoctor.phone}
                    onChange={(event) =>
                      setDoctor({ ...newDoctor, phone: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={newDoctor.email}
                    onChange={(event) =>
                      setDoctor({ ...newDoctor, email: event.target.value })
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
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="specialization"
                    type="text"
                    placeholder="Specialization"
                    value={newDoctor.specialization}
                    onChange={(event) =>
                      setDoctor({
                        ...newDoctor,
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
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="qualification"
                    type="text"
                    placeholder="Qualification"
                    value={newDoctor.qualification}
                    onChange={(event) =>
                      setDoctor({
                        ...newDoctor,
                        qualification: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newDoctor.password}
                    onChange={(event) =>
                      setDoctor({ ...newDoctor, password: event.target.value })
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
              </fieldset>
            </form>
          </div>
          <div className="w-full max-w-md">
            <form className="sm:border-solid sm:border-2 border-gray-600 bg-transparent shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
              <fieldset>
                <legend className="text-red-800 font-bold text-center text-2xl">
                  DELETE DOCTOR
                </legend>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    E-mail
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="email"
                    placeholder="E-mail"
                    value={delDoctor.name}
                    onChange={(event) =>
                      setDelDoctor({ ...delDoctor, email: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="id"
                  >
                    Doctor id:
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="id"
                    type="text"
                    placeholder="ID"
                    value={delDoctor.id}
                    onChange={(event) =>
                      setDelDoctor({ ...delDoctor, id: event.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                  <button
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    name="Delid"
                    onClick={handleDelete}
                  >
                    DELETE ID
                  </button>
                  <span>OR</span>
                  <button
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    name="Delmail"
                    onClick={handleDeleteMail}
                  >
                    DELETE MAIL
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorPage;
