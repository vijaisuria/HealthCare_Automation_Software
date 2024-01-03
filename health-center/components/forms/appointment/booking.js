import React, { useState, useEffect } from "react";
import axios from "../../../services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingPage = () => {
  const [userData, setUserData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");

  const getFormattedDay = (dateString) => {
    const dateObject = new Date(dateString);
    const dayIndex = dateObject.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[dayIndex];
    return dayName;
  };

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "test", email: "vj@gmail.com" })
    );
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserData(foundUser);
    }
  }, []);

  useEffect(() => {
    // Fetch specialities from the backend API
    axios
      .get("/schedule") // Update with your actual route
      .then((response) => {
        const specialitiesValue = response.data.filter((speciality) => {
          return speciality.day === getFormattedDay(selectedDate);
        });
        setSpecialities(specialitiesValue);
      })
      .catch((error) => {
        console.error("Error fetching specialities: ", error);
      });
  }, [selectedDate]);

  const handleSpecialityChange = (event) => {
    const selectedSpeciality = event.target.value;
    setSelectedSpeciality(selectedSpeciality);

    // Fetch time slots based on the selected speciality
    axios
      .get(
        `/appointment/timeslot/${selectedSpeciality}/${getFormattedDay(
          selectedDate
        )}`
      ) // Update with your actual route
      .then((response) => {
        console.log(response.data);
        setTimeSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching time slots: ", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const appointmentData = {
      username: userData.username,
      email: userData.email,
      date: selectedDate,
      speciality: selectedSpeciality,
      startTime: selectedTimeSlot,
      reason: reason,
    };
    console.log(appointmentData);

    //Make a POST request to save the appointment
    axios
      .post("/appointment", appointmentData) // Update with your actual route
      .then((response) => {
        toast.success("Appointment Booked Successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.error("Error booking appointment: ", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="max-w-screen-sm mx-auto">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            value={userData.username || ""}
            className="w-full bg-gray-100 px-3 py-2 rounded-md"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={userData.email || ""}
            className="w-full bg-gray-100 px-3 py-2 rounded-md"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-gray-100 px-3 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Speciality</label>
          <select
            value={selectedSpeciality}
            onChange={handleSpecialityChange}
            className="w-full bg-gray-100 px-3 py-2 rounded-md"
          >
            <option value="">Select Speciality</option>
            {specialities.map((speciality) => (
              <option key={speciality._id} value={speciality.specialty}>
                {speciality.specialty}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Time Slot</label>
          <select
            value={selectedTimeSlot}
            onChange={(e) => {
              setSelectedTimeSlot(e.target.value);
            }}
            className="w-full bg-gray-100 px-3 py-2 rounded-md"
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot.startTime}>
                {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-gray-100 px-3 py-2 rounded-md"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Book Appointment
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BookingPage;
