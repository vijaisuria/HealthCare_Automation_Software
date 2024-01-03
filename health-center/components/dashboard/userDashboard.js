import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";

const UserDashboard = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios
      .get("/schedule") // Update with your actual route
      .then((response) => {
        setSchedule(response.data);
      })
      .catch((error) => {
        console.error("Error fetching schedule: ", error);
      });
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">
            Health Centre
          </Link>
          <div>
            <Link
              to="/user/dashboard"
              className="text-white mr-4 hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              to="/user/book"
              className="text-white hover:text-gray-300 mr-4"
            >
              Book
            </Link>
            <Link to="/logout" className="text-white hover:text-gray-300">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Schedule Table */}

      <div className="container mx-auto overflow-x-auto font-sans flex-col place-items-center justify-center">
        <div className="flex place-items-center flex-col justify-center">
          <h2 className="text-2xl text-center font-semibold mb-4">
            HEALTH CENTRE MIT CAMPUS - ANNA UNIVERSITY SPECIALISTS
          </h2>
          <table className="mt-6 p-4 table-auto border-collapse border-2 hover:box-shadow-2xl m-8">
            <thead>
              <tr className="p-3 font-bold uppercase bg-blue-500 border border-gray-300">
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Speciality</th>
                <th className="px-4 py-2">Timing</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry) => (
                <tr
                  key={entry._id}
                  className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white"
                >
                  <td className="border border-gray-300 p-3 my-2">
                    {entry.day}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {entry.specialty}
                  </td>
                  <td className="border border-gray-300 p-3 my-2">
                    {entry.startTime + "-" + entry.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
