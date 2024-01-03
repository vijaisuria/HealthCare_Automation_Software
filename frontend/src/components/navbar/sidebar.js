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
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                <img
                  src="/assets/images/mit-hc-logo.png"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-lg font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  HealthCare Admin Panel
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
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
                to="/admin/student"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="h-5 w-5 mr-2"
                />
                Student
              </Link>
            </li>
            <li className="mb-4  hover:bg-gray-900 p-2 rounded">
              <Link
                to="/admin/doctor"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
                <FontAwesomeIcon
                  icon={faUserFriends}
                  className="h-5 w-5 mr-2"
                />
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
        </div>
      </aside>

      <Outlet />
    </>
  );
};

export default Sidebar;
