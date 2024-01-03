import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGraduationCap,
  faChalkboardTeacher,
  faUsers,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

const RequestLandingPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center p-4">
      <header className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif font-semibold text-slate-800 mb-2">
          Request Registration Options
        </h1>
        <img
          src="/assets/images/mit-hc-footer.png"
          alt="Header"
          className=" mb-4"
        />
      </header>
      <div className="grid w-full md:w-3/4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {/* New Student Registration */}
        <Link
          to="/student/register"
          className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition duration-300"
        >
          <FontAwesomeIcon icon={faUser} className="text-2xl mb-2" />
          <h2 className="text-xl font-semibold mb-2">
            New Student Registration
          </h2>
          <p>Register as a new student</p>
        </Link>

        {/* Existing UG/PG/PHD Student */}
        <Link
          to="/nurse/create-request/student"
          className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition duration-300"
        >
          <FontAwesomeIcon icon={faGraduationCap} className="text-2xl mb-2" />
          <h2 className="text-xl font-semibold mb-2">
            Existing UG/PG/PHD Student
          </h2>
          <p>Register as an existing student</p>
        </Link>

        {/* Staff Member */}
        <Link
          to="/nurse/create-request/student"
          className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition duration-300"
        >
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            className="text-2xl mb-2"
          />
          <h2 className="text-xl font-semibold mb-2">
            New Staff Registeration
          </h2>
          <p>Register as a staff member</p>
        </Link>

        <Link
          to="/nurse/create-request/staff"
          className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition duration-300"
        >
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            className="text-2xl mb-2"
          />
          <h2 className="text-xl font-semibold mb-2">Existing Staff Member</h2>
          <p>Register as a new staff member</p>
        </Link>

        {/* Staff Family Member */}
        <Link
          to="/nurse/create-request/staff-family"
          className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition duration-300"
        >
          <FontAwesomeIcon icon={faUsers} className="text-2xl mb-2" />
          <h2 className="text-xl font-semibold mb-2">Staff Family Member</h2>
          <p>Register as a existing staff family member</p>
        </Link>

        {/* Others */}
        <Link
          to="/others"
          className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition duration-300"
        >
          <FontAwesomeIcon icon={faEllipsisH} className="text-2xl mb-2" />
          <h2 className="text-xl font-semibold mb-2">Others</h2>
          <p>Register as others</p>
        </Link>
      </div>
    </div>
  );
};

export default RequestLandingPage;
