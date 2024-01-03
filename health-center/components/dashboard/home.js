import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [doctorId, setDoctorId] = useState("");
  const [nurseId, setNurseId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInNurse = localStorage.getItem("nurse");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setDoctorId(foundUser.doctorId);
    } else if (loggedInNurse !== null) {
      const foundUser = JSON.parse(loggedInNurse);
      setDoctorId(foundUser.nurseId);
    } else {
      toast.error("Please login first");
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full h-screen bg-[url('https://wallpapers.com/images/featured/oco8w27tkw40cp90.jpg')] bg-no-repeat bg-cover">
      <ToastContainer />
    </div>
  );
}

export default Home;
