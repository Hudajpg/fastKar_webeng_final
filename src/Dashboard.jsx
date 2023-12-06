import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { firestore } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import { useAuthorization } from './authorization';


//import { getFirestore } from "firebase-admin/firestore";


const Dashboard = () => {
   
  const { userName } = useAuthorization();
        
return(
      <Container fluid className="flex-grow-1 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center align-items-center">
  <div className="mb-4"></div>
  <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
              Welcome, {userName}

            </h2>
  <div className="mb-4"></div>
  {/* for the design to be consistent with the prototype, we created 2 columns, 
  one for the map and the other for the upcoming bookings and calander
  */}
    <Col md={6}>
        {/*<GarageMap />, <UpcomingBookings />, and <CustomCalendar /> 
        are used to render their components which are specidfied below*/}  
      <GarageMap />
    </Col>
    <Col md={6}>
      <UpcomingBookings />
      <Link to="/calendar"> <CustomCalendar /></Link>
    </Col>
  </Row>
</Container>
  );
};

 //upcoming bookings view for the dashboard
const UpcomingBookings = () => {
  const upcomingBookings = [
    //for now, we hardcoded the information for testing purposes but the final deployment will include fetching "booking" data from mongoDB
    { id: 1, date: "2023-11-20", service: "Oil Change" },
    { id: 2, date: "2023-11-21", service: "Tire Rotation" },
  ];

  return (
    //card view for the upcoming bookings.
    <Card style={{ width: "300px", margin: "20" }}>
    <Card.Header>Upcoming Bookings</Card.Header>
      <Card.Body>
        {upcomingBookings.map((booking) => (
          <Card.Text key={booking.id}>
            Date: {booking.date}<br />
            Service: {booking.service}
          </Card.Text>
        ))}
      </Card.Body>
    </Card>
  );
};

//using the react-calendar module, we created a ready made clander 
const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    return (
        
        <div className="mt-4" style={{ width: "300px" }}>
        <Calendar value={selectedDate} onChange={handleDateChange} />
      </div>
    );
  };
  
  //using leaflet, we were able to create a map (similar to google maps), where we specified the coordinates of the garages over bahrain
const GarageMap = () => {
  useEffect(() => {
    const mapContainer = L.DomUtil.get("map");
  if (!mapContainer) {

      const map = L.map('map').setView([26.0667, 50.5577], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data © OpenStreetMap contributors",
      }).addTo(map);


      const garageIcon = L.icon({
        iconUrl: 'mark.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
   
      const garageLocations = [
        { lat: 26.2442, lng: 50.5874 }, 
        { lat: 26.2155, lng: 50.5885 }, 
     
      ];

      garageLocations.forEach((location) => {
        L.marker([location.lat, location.lng], { icon: garageIcon }).addTo(map);
      });
    }
  }, []);
    //fixing the size based on the prototype sizes 
  return <div id="map" style={{ width: "400px", height: "400px", flexShrink: 0 }}></div>;
};

export default Dashboard;