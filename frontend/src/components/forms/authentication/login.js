import React, { useState } from "react";

import NurseLoginForm from "./nurseLogin";
import DoctorLoginForm from "./doctorLogin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNurse, faUserMd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";

function LoginForm() {
  const [activeForm, setActiveForm] = useState("nurse");

  const handleFormSwitch = () => {
    setActiveForm(activeForm === "nurse" ? "doctor" : "nurse");
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#edf2f7" }}
    >
      <section className="w-full min-h-screen flex items-stretch text-white">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage: "url(/assets/images/mit-hc.jpg)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              MIT Health Care
            </h1>
            <p className="text-3xl my-4">
              Take care of your body; it's the only place you have to live
            </p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage: "url(/assets/images/mit-hc.jpg)",
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <div className="flex justify-center mb-3">
              <button
                onClick={handleFormSwitch}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {activeForm === "nurse" ? (
                  <>
                    Switch to Doctor <FontAwesomeIcon icon={faUserMd} />{" "}
                  </>
                ) : (
                  <>
                    Switch to Nurse <FontAwesomeIcon icon={faUserNurse} />{" "}
                  </>
                )}
              </button>
            </div>
            {activeForm === "nurse" ? <NurseLoginForm /> : <DoctorLoginForm />}
            <ToastContainer />
          </div>
        </div>
      </section>

      <a
        href="/admin"
        className="bg-purple-600 p-2 rounded-lg text-white fixed right-2 bottom-2"
      >
        Admin Login
      </a>
    </div>
  );
}

export default LoginForm;
