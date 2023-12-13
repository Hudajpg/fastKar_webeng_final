import React, { useState, useEffect } from "react";
import { useAuthorization } from "./authorization";
import { getFirestore, collection, doc, updateDoc, arrayRemove, getDoc, onSnapshot } from "firebase/firestore";
import {auth, firestore } from './firebase';

const AppointmentsPage = () => {
  const { bookingIDs, userRole } = useAuthorization();
  const [appointments, setAppointments] = useState([]);
  const [showAllocationSection, setShowAllocationSection] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const user = auth.currentUser;
useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(getFirestore(), "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();

        if (userData && userData.appointments && userData.appointments.length > 0) {
          const updatedAppointments = [];

          for (const bookingId of userData.appointments) {
            const bookingRef = doc(firestore, "bookings", bookingId);
            const bookingSnapshot = await getDoc(bookingRef);
            if (bookingSnapshot.exists()) {
              const bookingData = bookingSnapshot.data();
              updatedAppointments.push(bookingData);
            }
          }

          if (updatedAppointments.length > 0) {
            setAppointments(updatedAppointments);
            console.log("Appointments fetched:", updatedAppointments);
          } else {
            setAppointments([]);
            console.log("No appointments found.");
          }
        } else {
          setAppointments([]);
          console.log("No user data or appointments found.");
        }
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.log("Error fetching appointments:", error);
    }
  };
  if (userRole === "service provider") {
    setShowAllocationSection(true);
  }
  fetchAppointments();
}, []);

//
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleAllocationSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const userDocRef = doc(getFirestore(), "users", user.uid); 
      console.log(user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const allocatedDates = userData.allocatedDates || [];
  
        allocatedDates.push({ date: selectedDate, time: selectedTime });
  
        await updateDoc(userDocRef, {
          allocatedDates: allocatedDates
        });
  
        console.log("Allocation Successful!");
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.log("Error allocating date and time:", error);
    }
  };
//


  const cancelAppointment = async (appointmentId) => {
    try {
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
  
        if (userData && userData.appointments) {
          const updatedAppointments = userData.appointments.filter(
            (appointment) => appointment.id !== appointmentId
          );
  
          await updateDoc(userRef, {
            appointments: updatedAppointments,
          });
  
          setAppointments(updatedAppointments);
          console.log("Appointment canceled:", appointmentId);
        } else {
          console.log("No user data or appointments found.");
        }
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.log("Error canceling appointment:", error);
    }
  };













  return (
    <div className="container">
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        Manage Appointments
      </h2>
      <div className="mb-4"></div>
      {showAllocationSection && (
        <div className="mb-4">
         {showAllocationSection && (
  <div className="mb-4">
    <h3 className="text-center">Allocate Time Slots</h3>
    <form onSubmit={handleAllocationSubmit}>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" className="form-control" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <input type="time" id="time" className="form-control" value={selectedTime} onChange={handleTimeChange} />
      </div>
      <button type="submit" className="btn btn-primary">Allocate</button>
    </form>
  </div>
)}
        </div>
      )}
      {appointments.length > 0 ? (
        <div>
          {appointments.map((appointment) => (
            <div className="card mb-3" key={appointment.id}>
              <div className="card-body">
                <h5 className="card-title">Booking ID: {appointment.id}</h5>
                <p className="card-text">Date: {appointment.appointmentDate}</p>
                <p className="card-text">Time: {appointment.appointmentTime}</p>
                <p className="card-text">Customer Name: {appointment.customerFirstName} {appointment.customerLastName} </p>
                <p className="card-text">Email: {appointment.customerEmail}</p>
                <p className="card-text">Car Model: {appointment.carModel}</p>
                <button className="btn btn-danger" onClick={() => cancelAppointment(appointment.id)}>
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentsPage;