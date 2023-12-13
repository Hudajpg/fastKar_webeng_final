import React, { useState, useEffect } from "react";
import { useAuthorization } from "./authorization";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function BookingInfo({ handleSubmit, handleChange, userData }) {
  const { agentOptions } = useAuthorization();
  const [allocatedDates, setAllocatedDates] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const filteredDates = allocatedDates.filter((date) => date.date === selectedDate);
    const availableTimes = filteredDates.map((date) => date.time);

    // Add your logic for handling the date change here
  };

  useEffect(() => {
    const fetchAllocatedDates = async () => {
      try {
        const firestore = getFirestore();
        const usersCollectionRef = collection(firestore, "users");
        const q = query(usersCollectionRef, where("role", "==", "service provider"));

        const querySnapshot = await getDocs(q);
        const dates = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.allocatedDates && data.name === selectedAgent) {
            dates.push(...data.allocatedDates);
          }
        });

        setAllocatedDates(dates);
      } catch (error) {
        console.log("Error fetching allocated dates:", error);
      }
    };

    if (selectedAgent) {
      fetchAllocatedDates();
    }
  }, [selectedAgent]);

  const handleAgentChange = (event) => {
    const agentName = event.target.value;
    setSelectedAgent(agentName);
    handleChange(event);
  };

  return (
    <div className="booking-info-container">
      
      <div className="mb-4"></div>
      <select
        className="form-control"
        name="agentName"
        value={userData.agentName}
        onChange={handleAgentChange}
        required
      >
        <option value="">Select Agent</option>
        {agentOptions.map((agent) => (
          <option key={agent} value={agent}>
            {agent}
          </option>
        ))}
      </select>
      <div className="mb-4"></div>
      <div className="mb-4"></div>
      <select
  className="form-control"
  name="appointmentDate"
  value={userData.appointmentDate}
  onChange={(event) => {
    handleChange(event);
    handleDateChange(event);
  }}
  required
>
  <option value="">Select Date</option>
  {allocatedDates.map((date, index) => (
    <option key={index} value={date.date}>
      {date.date}
    </option>
  ))}
</select>
      <div className="mb-4"></div>
      <select
        className="form-control"
        name="appointmentTime"
        value={userData.appointmentTime}
        onChange={handleChange}
        required
      >
        <option value="">Select Time</option>
        {allocatedDates
          .filter((date) => date.date === userData.appointmentDate)
          .map((date) => (
            <option key={date.date + date.time} value={date.time}>
              {date.time}
            </option>
          ))}
      </select>
  
 
    </div>
  );
}

export default BookingInfo;