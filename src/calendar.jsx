import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddBooking = () => {
    setBookedDates([...bookedDates, selectedDate]);
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (bookedDates.includes(formattedDate)) {
      return (
        <div className="booked-date">
          <p>{formattedDate}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-4" style={{ width: "300px" }}>
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={tileContent}
      />
      <button onClick={handleAddBooking}>Add Booking</button>
    </div>
  );
};

export default CustomCalendar;