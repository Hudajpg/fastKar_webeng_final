import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./Login";
import Signup from "./Signup";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import RoadAssistance from "./road-assistance";
import CustomCalendar from "./calendar";
import Form from "./booking";
import AppointmentsPage from "./manageBookings";
import ServicesPage, { ServiceDetailsPage } from "./services";
import HistoryPage from "./History";
import ManageUsersPage from "./manageUsers";
import ServiceProviderInfoPage from "./serviceProviderPage";
import ProfilePage from "./profile";
import HistoryPageRoad from "./history-road";
import RoadAssistanceForm from "./roadAssistantPage";
const App = () => {

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/road-assistance" element={<RoadAssistance />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailsPage />} />
          <Route path="/calendar" element={<CustomCalendar />} />
          <Route path="/booking" element={<Form />} />
          <Route path="/managebookings" element={<AppointmentsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/manageusers" element={<ManageUsersPage />} />
          <Route path="/serviceprov-info" element={<ServiceProviderInfoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history-roadassist" element={<HistoryPageRoad />} />
          <Route path="/roadassistantpage" element={<RoadAssistanceForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;