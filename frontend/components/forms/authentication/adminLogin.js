import React, { useState, useEffect } from "react";
import axios from "../../../services/api";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setAdminId(foundUser.adminId);
      toast.success("Logged in successfully");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/admin", { email, password })
      .then((response) => {
        const admin = {
          adminId: response.data.admin,
        };
        localStorage.setItem("admin", JSON.stringify(admin));
        setAdminId(response.data.admin);
        toast.success("Logged in successfully");

        console.log(response.data.admin);

        axios
          .post("/auth/admin-logs", {
            adminUsername: response.data.admin,
            action: "Admin Logged in",
            notes: email,
          })
          .then(() => console.log("Admin logged in"))
          .catch((error) => console.log(error));
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "Error while logging",
          notes: email,
        });
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="flex justify-center place-items-center place-center  align-items-center h-screen  font-sans bg-no-repeat bg-cover bg-[url('https://t4.ftcdn.net/jpg/04/24/30/93/360_F_424309320_UkOxg2z3sq7yXwGnWCO6xBXkRI4byhnI.jpg')]">
      <div className="w-full max-w-xl">
        <form
          className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow focus:bg-slate-600  focus:text-white fo appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              className="shadow  focus:bg-slate-600 focus:text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminLoginForm;
