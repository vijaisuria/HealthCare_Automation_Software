import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/navbar/doctorNavbar";
import PrescriptionForm from "./components/forms/prescription/prescriptionForm";
import Prescriptions from "./components/prescription/prescriptions";
import Prescription from "./components/prescription/prescription";
import DoctorProfile from "./components/profile/docProfile";
import LoginForm from "./components/forms/authentication/login";
import AdminLoginForm from "./components/forms/authentication/adminLogin";
import Home from "./components/dashboard/home";
import Sidebar from "./components/navbar/sidebar";
import DoctorPage from "./components/ADMIN/doctor.page";
import StudentPage from "./components/ADMIN/student.page";
import AdminPage from "./components/ADMIN/admin.page";
import MedicinePage from "./components/ADMIN/medicines/medicine.page";
import NursePage from "./components/ADMIN/nurse.page";
import SupplierPage from "./components/ADMIN/supplier.page";
import AdminPanel from "./components/dashboard/adminDashboard";
import NurseRequestForm from "./components/forms/prescription/nurseStudentRequestForm";
import DoctorDashboard from "./components/requests/doctorDashboard";
import PrescriptionEditForm from "./components/forms/prescription/prescriptionEditForm";
import Error404 from "./components/error/notfound";
import Error500 from "./components/error/error500";
import NurseNavBar from "./components/navbar/nurseNav";
import NurseProfile from "./components/profile/nurseProfile ";
import NurseDashboard from "./components/requests/nurseDashboard";
import Team from "./components/team/team";
import Footer from "./components/footer/footer";
import UserDashboard from "./components/dashboard/userDashboard";
import BookingPage from "./components/forms/appointment/booking";
import SPrescriptions from "./components/prescription/studentPrescription";
import StudentRegistrationForm from "./components/forms/user/studentRegister";
import VerificationForm from "./components/forms/user/verifyStudentRegister";
import AdminLogs from "./components/logs/adminLog";
import RequestLandingPage from "./components/forms/prescription/newRequest";
import NurseStaffRequestForm from "./components/forms/prescription/nurseStaffRequestForm";
import StaffRegistrationForm from "./components/forms/user/staffRegister";
import WelcomePage from "./components/forms/user/landingUser";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route path="/register">
            <Route index element={<WelcomePage />} />
            <Route path="student" element={<StudentRegistrationForm />} />
            <Route path="staff" element={<StaffRegistrationForm />} />
          </Route>

          <Route path="/student">
            <Route path="register" element={<StudentRegistrationForm />} />
            <Route path="prescriptions/:reg" element={<SPrescriptions />} />
          </Route>

          <Route path="/doctor" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="create" element={<PrescriptionForm />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="requests" element={<DoctorDashboard />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="edit/:id" element={<PrescriptionEditForm />} />
          </Route>

          <Route path="/nurse" element={<NurseNavBar />}>
            <Route index element={<Home />} />

            <Route path="new" element={<RequestLandingPage />} />
            <Route path="requests" element={<NurseDashboard />} />
            <Route
              path="create-request/student"
              element={<NurseRequestForm />}
            />
            <Route
              path="create-request/staff"
              element={<NurseStaffRequestForm />}
            />
            <Route
              path="create-request/staff-family"
              element={<NurseStaffRequestForm />}
            />
            <Route path="profile" element={<NurseProfile />} />
            <Route path="prescriptions" element={<Prescriptions />} />
          </Route>

          <Route path="/admin" element={<Sidebar />}>
            <Route index element={<AdminLoginForm />} />
            <Route path="dashboard" element={<AdminPanel />} />
            <Route path="admins" element={<AdminPage />} />
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="nurse" element={<NursePage />} />
            <Route path="medicine" element={<MedicinePage />} />
            <Route path="verify" element={<VerificationForm />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="doctor" element={<DoctorPage />} />
            <Route path="student" element={<StudentPage />} />
          </Route>

          <Route path="/prescriptions/:id" element={<Prescription />} />

          <Route path="/team" element={<Team />} />
          <Route path="/error" element={<Error500 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
