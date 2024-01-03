import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import "./admin.page.css";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPage() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
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
      .get("/auth/admin")
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="ml-8 lg:ml-64">
      <div
        className=" bg-yellow-500 origin-top float-right mt-9 mr-9 w-72 text-center"
        style={{ transform: "translateX(50%) rotate(45deg)" }}
      >
        <div className="">Hi!</div>
        <div className="">I am nice ribbon</div>
        <div className="">That sits in a corner. </div>
      </div>
      <header className="bg-indigo-800 h-16 top-0 fixed w-full flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">ADMINS</h1>
      </header>
      <div className="container mx-auto overflow-x-auto font-sans flex flex-col place-items-center justify-center">
        <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
          <table className="mt-32 table-auto border-collapse border-2 hover:box-shadow-2xl m-8">
            <thead>
              <tr className="p-3 font-bold uppercase bg-purple-500 border border-gray-300">
                <th className="border border-gray-300 p-3 my-2">Username</th>
                <th className="border border-gray-300 p-3 my-2">Email</th>
                <th className="border border-gray-300 p-3 my-2">Phone</th>
                <th className="border border-gray-300 p-3 my-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin._id}
                  className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white  uppercase  "
                >
                  <td className="border border-gray-300 p-3 my-2">
                    {admin.username}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {admin.email}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {admin.phone}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {admin.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center h-64">
        <div className="relative w-96 p-8 border-2 border-gray-500 rounded-lg shadow-lg notice-board">
          <div className="glitter-effect"></div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Notice Board</h2>
            <p className="text-red-600 ">
              Please contact the super admin for adding or modifying admin data.
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminPage;
