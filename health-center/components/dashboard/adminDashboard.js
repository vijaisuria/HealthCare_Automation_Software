import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MedicineUploadForm from "../forms/medicine/medicineUpload";
import AdminLogs from "../logs/adminLog";

function AdminPanel() {
  const navigate = useNavigate();
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

  return (
    <div className="ml-8 lg:ml-64">
      {" "}
      <header className="bg-indigo-800 h-16 top-0 fixed w-full flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">DASHBOARD</h1>
      </header>
      <div className="container mx-auto overflow-x-auto place-items-center font-sans flex flex-col justify-center">
        <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
          <div className="mt-32 m-8">
            <MedicineUploadForm />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
          <AdminLogs />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
