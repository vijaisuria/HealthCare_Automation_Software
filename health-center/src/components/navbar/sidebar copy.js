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
  faUserGraduate,
  faHistory,
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
      <ul>
        <li className="mb-4 hover:bg-gray-900 p-2 rounded">
          <Link
            to="/admin/dashboard"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="mb-4  hover:bg-gray-900 p-2 rounded">
          <Link
            to="/admin/admins"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon icon={faUser} className="h-5 w-5 mr-2" />
            Admin
          </Link>
        </li>
        <li className="mb-4  hover:bg-gray-900 p-2 rounded">
          <Link
            to="/admin/students"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon icon={faUserGraduate} className="h-5 w-5 mr-2" />
            Student
          </Link>
        </li>
        <li className="mb-4  hover:bg-gray-900 p-2 rounded">
          <Link
            to="/admin/doctor"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5 mr-2" />
            Doctor
          </Link>
        </li>
        <li className="mb-4  hover:bg-gray-900 p-2 rounded">
          <Link
            to="/admin/supplier"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon icon={faTruck} className="h-5 w-5 mr-2" />
            Supplier
          </Link>
        </li>
        <li className="mb-4  hover:bg-gray-900 p-2 rounded">
          <Link
            to="/admin/medicine"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon icon={faPills} className="h-5 w-5 mr-2" />
            Medicine
          </Link>
        </li>
        <li className="mb-4 hover:bg-gray-900 p-2 rounded">
          <Link
            to="/admin/nurse"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon icon={faUserFriends} className="h-5 w-5 mr-2" />
            Nurse
          </Link>
        </li>
        <li className="mb-4 hover:bg-gray-900 p-2 rounded">
          <Link
            to="/admin/logs"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <FontAwesomeIcon icon={faHistory} className="h-5 w-5 mr-2" />
            Logs
          </Link>
        </li>
        <li className="mb-4 bg-red-700 hover:bg-red-800 p-2 rounded">
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            onClick={handleSignout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 mr-2" />
            Logout
          </span>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Sidebar;
