import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../services/api";
import {
  faHome,
  faUser,
  faClipboardList,
  faTruck,
  faPills,
  faUserFriends,
  faSignOutAlt,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleSignout = () => {
    const loggedInUser = localStorage.getItem("admin");
    console.log("logout");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      localStorage.removeItem("admin");
      axios.post("/auth/admin-logs", {
        adminUsername: foundUser.adminId,
        action: "Admin Logged out",
        notes: "nil",
      });
      window.location.href = "/admin";
    }
  };

  return (
    <>
      <button
        className="text-black fixed top-0 bg-indigo-800 w-30 lg:hidden transition duration-300 flex items-center"
        onClick={toggleSidebar}
      >
        {isVisible ? (
          <FontAwesomeIcon
            icon={faTimes}
            className="h-5 w-4 mr-2 p-5 border-2 hover:border-gray-500"
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="h-6 w-4 mr-2 p-5  -ml-3 hover:border-2 hover:border-gray-500"
          />
        )}
      </button>
      <div
        className={
          isVisible
            ? "bg-gray-800 h-screen w-30 lg:w-64 px-4 py-8 float-left fixed lg:left-0 top-16 lg:top-0"
            : "hidden lg:block bg-gray-800 h-screen w-30 lg:w-64 px-4 py-8 float-left fixed left-0"
        }
      >
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <nav>
          <ul>
            <li className="mb-4 hover:bg-gray-900 p-2 rounded">
              <Link
                to="/admin/dashboard"
                className="text-white w-full hover:text-gray-400 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="mb-4  hover:bg-gray-900 p-2 rounded">
              <Link
                to="/admin/admins"
                className="text-white hover:text-gray-400 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 mr-2" />
                Admin
              </Link>
            </li>
            <li className="mb-4  hover:bg-gray-900 p-2 rounded">
              <Link
                to="/admin/doctor"
                className="text-white hover:text-gray-400 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="h-5 w-5 mr-2"
                />
                Doctor
              </Link>
            </li>
            <li className="mb-4  hover:bg-gray-900 p-2 rounded">
              <Link
                to="/admin/supplier"
                className="text-white hover:text-gray-400 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faTruck} className="h-5 w-5 mr-2" />
                Supplier
              </Link>
            </li>
            <li className="mb-4  hover:bg-gray-900 p-2 rounded">
              <Link
                to="/admin/medicine"
                className="text-white hover:text-gray-400 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faPills} className="h-5 w-5 mr-2" />
                Medicine
              </Link>
            </li>
            <li className="mb-4 hover:bg-gray-900 p-2 rounded">
              <Link
                to="/admin/nurse"
                className="text-white hover:text-gray-400 transition duration-300 flex items-center"
              >
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className="h-5 w-5 mr-2"
                />
                Nurse
              </Link>
            </li>
            <li className="mb-4 bg-red-700 hover:bg-red-800 p-2 rounded">
              <span
                className="text-white hover:text-gray-400 transition duration-300 flex items-center"
                onClick={handleSignout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 mr-2" />
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
