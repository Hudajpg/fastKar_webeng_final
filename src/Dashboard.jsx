
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from 'date-fns';
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
            <div className="mb-4"></div>  <div className="mb-4"></div>
  {/* for the design to be consistent with the prototype, we created 2 columns, 
  one for the map and the other for the upcoming bookings and calander
  */}
    <Col md={6}>
      
        {/*<GarageMap />, <UpcomingBookings />, and <CustomCalendar /> 
        are used to render their components which are specidfied below*/}  
       <center> <h4 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>Car Service Locations</h4>
      <GarageMap /></center>
    </Col>
    
    <Col md={6}>
    <div className="mb-4"></div>  <div className="mb-4"></div>

      <UpcomingBookings />
     <CustomCalendar />

    </Col>
    <div className="mb-4"></div>  <div className="mb-4"></div>

  </Row>

</Container>
  );
};

 //upcoming bookings view for the dashboard
 const UpcomingBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  const { currentUser } = useAuthorization(); // Get the current authenticated user

  useEffect(() => {
    if (currentUser) {
      const userRef = firestore.collection('users').doc(currentUser.uid); // Reference to the current user's document in the "users" collection

      // Listen for changes to the user's bookings
      const unsubscribe = userRef.collection('bookings').onSnapshot((snapshot) => {
        const bookings = snapshot.docs.map((doc) => doc.data());
        setUpcomingBookings(bookings);
      });

      return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
    }
  }, [currentUser]);

  return (
    <Card style={{ width: "300px", margin: "20" }}>
      <Card.Header>Upcoming Bookings</Card.Header>
      <Card.Body>
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map((booking) => (
            <Card.Text key={booking.id}>
              Date: {booking.date}<br />
              Service: {booking.service}
            </Card.Text>
          ))
        ) : (
          <Card.Text>No upcoming bookings.</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

//using the react-calendar module, we created a ready made clander 

  const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const bookedDates = [new Date("2023-12-15"), new Date("2023-12-20"), new Date("2022-03-25")];
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const tileContent = ({ date }) => {
      const isBooked = bookedDates.some((bookedDate) => isSameDay(bookedDate, date));
  
      return isBooked ? <div className="booked-date"></div> : null;
    };
  
    return (
      <div className="mt-4" style={{ width: "300px" }}>
        <Calendar value={selectedDate} onChange={handleDateChange} tileContent={tileContent} />
      </div>
    );
};
  //using leaflet, we were able to create a map (similar to google maps), where we specified the coordinates of the garages over bahrain
  const GarageMap = () => {
    useEffect(() => {
      const mapContainer = L.DomUtil.get("map");
      if (mapContainer) {
        mapContainer._leaflet_id = null;
      }
  
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
        { lat: 26.178831795007312, lng: 50.531856960764145 },
        { lat: 26.18919655718173, lng: 50.54077983003449 },
        { lat: 26.160660138052066, lng: 50.61121910297141 },
        { lat: 26.194134132587944, lng: 50.5398417041779 },
        { lat: 26.150178553334243, lng: 50.617885002300405 },
        { lat: 26.138922328182982, lng: 50.6060403678527 },
        { lat: 26.182129384019582, lng: 50.51861680395814 },
        { lat: 26.15708527755971, lng: 50.611705193088056 },
        { lat: 26.15747022804147, lng: 50.610160240777226 },
      ];
  
      garageLocations.forEach((location) => {
        L.marker([location.lat, location.lng], { icon: garageIcon }).addTo(map);
      });
    }, []);
  
    return <div id="map" style={{ width: "400px", height: "400px", flexShrink: 0 }}></div>;
  };

export default Dashboard;