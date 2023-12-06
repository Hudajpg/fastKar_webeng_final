import React from "react";
import { useAuthorization } from "./authorization";
import { ServiceDetailsPage } from "./services";

function BookingInfo({ handleSubmit, handleChange, userData }) {
  const { agentOptions } = useAuthorization();

  const handleDateChange = (event) => {
    // Add your logic here to update the available time slots based on the selected date
  };

  return (
    <div className="booking-info-container">
      <input
        type="date"
        className="form-control"
        name="appointmentDate"
        placeholder="Appointment Date"
        value={userData.appointmentDate}
        onChange={(event) => {
          handleChange(event);
          handleDateChange(event);
        }}
        required
      />
      <div className="mb-4"></div>
      <select
        className="form-control"
        name="appointmentTime"
        value={userData.appointmentTime}
        onChange={handleChange}
        required
      >
        <option value="">Select Time</option>
        {userData.appointmentDate === "2023-01-01" && (
          <>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
          </>
        )}
        {userData.appointmentDate === "2022-01-02" && (
          <>
            <option value="13:00">01:00 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
          </>
        )}
        
      </select>

      <div className="mb-4"></div>
      <select
        className="form-control"
        name="agentName"
        value={userData.agentName}
        onChange={handleChange}
        required
      >
        <option value="">Select Agent</option>
        {agentOptions.map((agent) => (
          <option key={agent} value={agent}>
            {agent}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BookingInfo;