import React, { useState, useEffect } from "react";
import { useAuthorization } from "./authorization";
import { getFirestore, collection, doc, updateDoc, arrayRemove, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from './firebase';

const AppointmentsPage = () => {
  const { bookingIDs, role } = useAuthorization();
  const [appointments, setAppointments] = useState([]);
  const [showAllocationSection, setShowAllocationSection] = useState(false);


  useEffect(() => {
    const fetchAppointments = async () => {
      if (bookingIDs && bookingIDs.length > 0) {
        try {
          const updatedAppointments = [];

          // Fetch appointments one by one from the array
          for (const bookingId of bookingIDs) {
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
        } catch (error) {
          console.log("Error fetching appointments:", error);
        }
      } else {
        console.log("Booking IDs are undefined or empty.");
      }
    };

    fetchAppointments();
  }, [bookingIDs]);

  useEffect(() => {
    setShowAllocationSection(role === "service provider");
  }, [role]);

  const cancelAppointment = async (appointmentId) => {
    if (bookingIDs) {
      try {
        const userRef = doc(firestore, "users", bookingIDs[0]);
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
      } catch (error) {
        console.log("Error canceling appointment:", error);
      }
    } else {
      console.log("Booking ID is undefined.");
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
          <h3 className="text-center">Allocate Time Slots</h3>
          {/* ... Allocation section code here ... */}
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