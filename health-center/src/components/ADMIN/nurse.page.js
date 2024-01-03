import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NursePage() {
  const [nurses, setNurses] = useState([]);
  const [newNurse, setNurse] = useState({});

  const [delNurse, setDelNurse] = useState({});

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
      .get("/nurse")
      .then((response) => {
        setNurses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    axios
      .post(`/nurse`, newNurse)
      .then((response) => {
        console.log(response);
        toast.success("Nurse profile added, Refresh the page");

        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "Nurse added",
          notes: newNurse.email,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (!delNurse.id) {
      toast.error("Nurse Id is required");
      return;
    }

    axios
      .delete(`/nurse/${delNurse.id}`)
      .then((response) => {
        console.log(response);
        toast.warning("Nurse deleted successfully");

        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "nurse deleted",
          notes: delNurse.id,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server error, please try again later");
      });
  };

  const handleDeleteMail = (event) => {
    event.preventDefault();

    if (!delNurse.email) {
      toast.error("Mail Id is required");
      return;
    }

    axios
      .delete(`/nurse/mail/${delNurse.email}`)
      .then((response) => {
        console.log(response);
        toast.warning("Nurse deleted successfully");

        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "nurse deleted",
          notes: delNurse.email,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      });
  };

  return (
    <div className="ml-8 lg:ml-64">
      <div className="flex-col">
        <header className="bg-indigo-800 h-16 top-0 fixed w-full flex items-center justify-center">
          <h1 className="text-white text-2xl font-bold">NURSES</h1>
        </header>
        <div className="flex flex-col">
          <div className="container mx-auto overflow-x-auto place-items-center font-sans flex flex-col justify-center">
            <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
              <table className="mt-32 table-auto border-collapse border-2 hover:box-shadow-2xl m-8">
                <thead>
                  <tr className="p-3 font-bold uppercase bg-blue-500 border border-gray-300">
                    <th className="border border-gray-300 p-3 my-2">Name</th>
                    <th className="border border-gray-300 p-3 my-2">Email</th>
                    <th className="border border-gray-300 p-3 my-2">Phone</th>
                    <th className="border border-gray-300 p-3 my-2">
                      Qualification
                    </th>
                    <th className="border border-gray-300 p-3 my-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {nurses.map((nurse) => (
                    <tr
                      key={nurse._id}
                      className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white  uppercase  "
                    >
                      <td className="border border-gray-300 p-3 my-2">
                        {nurse.name}
                      </td>
                      <td className="border border-gray-300 p-3 my-2">
                        {nurse.email}
                      </td>
                      <td className="border border-gray-300 p-3 my-2">
                        {nurse.phone}
                      </td>
                      <td className="border border-gray-300 p-3 my-2">
                        {nurse.qualification}
                      </td>
                      <td className="border border-gray-300 p-3 my-2">
                        {new Date(nurse.date).toLocaleDateString("en-GB")}
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
                    ADD NURSE
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
                      value={newNurse.name}
                      required
                      onChange={(event) =>
                        setNurse({ ...newNurse, name: event.target.value })
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
                      value={newNurse.phone}
                      onChange={(event) =>
                        setNurse({ ...newNurse, phone: event.target.value })
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
                      value={newNurse.email}
                      onChange={(event) =>
                        setNurse({ ...newNurse, email: event.target.value })
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
                      value={newNurse.specialization}
                      onChange={(event) =>
                        setNurse({
                          ...newNurse,
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
                      value={newNurse.qualification}
                      onChange={(event) =>
                        setNurse({
                          ...newNurse,
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
                      value={newNurse.password}
                      onChange={(event) =>
                        setNurse({
                          ...newNurse,
                          password: event.target.value,
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
                </fieldset>
              </form>
            </div>
            <div className="w-full max-w-md">
              <form className="sm:border-solid sm:border-2 border-gray-600 bg-transparent shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <fieldset>
                  <legend className="text-red-800 font-bold text-center text-2xl">
                    DELETE NURSE
                  </legend>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="mail"
                    >
                      E-mail
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="mail"
                      type="email"
                      placeholder="E-mail"
                      value={delNurse.name}
                      onChange={(event) =>
                        setDelNurse({
                          ...delNurse,
                          email: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="id"
                    >
                      Nurse id:
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="id"
                      type="text"
                      placeholder="ID"
                      value={delNurse.id}
                      onChange={(event) =>
                        setDelNurse({ ...delNurse, id: event.target.value })
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
      <ToastContainer />
    </div>
  );
}

export default NursePage;
