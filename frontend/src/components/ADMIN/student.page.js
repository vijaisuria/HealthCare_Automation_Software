import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGraduationCap,
  faChalkboardTeacher,
  faUsers,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
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
      .get("/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getIndianTime = (now) => {
    now = new Date(now);
    const utcOffset = 5.5; // India's UTC offset is 5 hours and 30 minutes ahead of UTC.
    const indianTime = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);
    return indianTime.toISOString().slice(0, 10);
  };

  return (
    <div className="ml-8 lg:ml-64">
      <header className="bg-indigo-800 h-16 top-0 fixed w-full flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">STUDENTS</h1>
      </header>

      <div className="mt-32 container mx-auto overflow-x-auto font-sans flex flex-col place-items-center justify-center">
        <div className="grid w-full md:w-3/4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {/* New Student Registration */}
          <Link
            to="/student/register"
            className="bg-blue-100 rounded-lg shadow-xl p-4 hover:bg-blue-50 transition duration-300"
          >
            <FontAwesomeIcon icon={faUser} className="text-2xl mb-2" />
            <h2 className="text-xl font-semibold mb-2">
              New Student Registration
            </h2>
            <p>Register as a new student</p>
          </Link>

          {/* Existing UG/PG/PHD Student */}
          <Link
            to="/admin/verify"
            className="bg-blue-100 rounded-lg shadow-2xl p-4 hover:bg-blue-50 transition duration-300"
          >
            <FontAwesomeIcon icon={faGraduationCap} className="text-2xl mb-2" />
            <h2 className="text-xl font-semibold mb-2">
              Verify Existing Student
            </h2>
            <p>Verify the records in order to proceed</p>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
          <table className=" table-auto border-collapse border-2 hover:box-shadow-2xl m-8">
            <thead>
              <tr className="p-3 font-bold uppercase bg-purple-500 border border-gray-300">
                <th className="border border-gray-300 p-3 my-2">
                  Register Number
                </th>
                <th className="border border-gray-300 p-3 my-2">Name</th>
                <th className="border border-gray-300 p-3 my-2">Email</th>
                <th className="border border-gray-300 p-3 my-2">DOB</th>
                <th className="border border-gray-300 p-3 my-2">Department</th>
                <th className="border border-gray-300 p-3 my-2">Residence</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student._id}
                  className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white"
                >
                  <td className="border border-gray-300 p-3 my-2">
                    {student.registerNumber}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {student.name}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {student.email}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {getIndianTime(student.dob)}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {student.department}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {student.residence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default StudentPage;
