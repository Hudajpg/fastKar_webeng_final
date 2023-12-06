import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Row, Col } from 'react-bootstrap';
import React, { createContext, useState } from "react";

const serviceAgents = [
  { id: 1, name: "Nissan", location: "Salmabad", imageName: "logo192.png",
    basicDetails:"Wheel & Brakes Care, Battery Service, Oil Change", basicPrice: "35",  
    standardDetails:"Basic Vehicle Service, Vehicle Engine Cleaning", standardPrice: "50",
    comprehensiveDetails:"Full Service Package, Vehicle Testing ", comprehensivePrice: "88"},

  { id: 2, name: "Toyota", location: "Tubli", imageName: "", 
    basicDetails:"Wheel & Brakes Care, Battery Service, Oil Change", basicPrice: "40", 
    standardDetails:"Basic Vehicle Service, Vehicle Engine Cleaning", standardPrice: "55",
    comprehensiveDetails:"Full Service Package, Vehicle Testing", comprehensivePrice: "90"},


    { id: 3, name: "BMW", location: "Sitra", imageName: "", 
    basicDetails:"Wheel & Brakes Care, Battery Service, Oil Change, Windsheild Fluid Solution", basicPrice: "60",  
    standardDetails:"Basic Vehicle Service, Vehicle Engine Cleaning, Wheel Polishing", standardPrice: "90",
    comprehensiveDetails:"Full Service Package, Vehicle Testing", comprehensivePrice: "110"},


    { id: 4, name: "McLareen", location: "Tubli", imageName: "", 
    basicDetails:"Wheel & Brakes Care, Battery Service, Oil Change, Windsheild Fluid Solution", basicPrice: "120", 
    standardDetails:"Basic Vehicle Service, Vehicle Engine Cleaning, Wheel Polishing", standardPrice: "135", 
    comprehensiveDetails:"Full Service Package, Vehicle Testing, Vehicle pickup and dropoff", 
    comprehensivePrice: "150"},


    { id: 5, name: "Changan", location: "Al Eker", imageName: "", 
    basicDetails:"Wheel Care, Battery Service, Oil Change", basicPrice: "20",  
    standardDetails:"Basic Vehicle Service", standardPrice: "40", 
    comprehensiveDetails:"Full Vehicle Testing, and Service ", comprehensivePrice: "60"},


    { id: 6, name: "Masarati", location: "Sitra", imageName: "", 
    basicDetails:"Wheel & Brakes Care, Battery Service, Oil Change, Windsheild Fluid Solution", basicPrice: "110",  
    standardDetails:"Basic Vehicle Service, Vehicle Engine Cleaning, Wheel Polishing", standardPrice: "130",
    comprehensiveDetails:"Full Service Package, Vehicle Testing, Vehicle pickup and dropoff",
     comprehensivePrice: "145"},


    { id: 7, name: "Porche", location: "Sitra", imageName: "", 
    basicDetails:"Wheel & Brakes Care, Battery Service, Oil Change, Windsheild Fluid Solution", basicPrice: "60",  
    standardDetails:"Basic Vehicle Service, Vehicle Engine Cleaning, Wheel Polishing", standardPrice: "80", 
    comprehensiveDetails:"Full Service Package, Vehicle Testing, Vehicle pickup and dropoff", 
    comprehensivePrice: "100"},


    { id: 8, name: "Ford", location: "Sitra", imageName: "", 
    basicDetails:"Wheel & Brakes Care, Battery Service, Oil Change", basicPrice: "47",  
    standardDetails:"Basic Vehicle Service, Vehicle Engine Cleaning", standardPrice: "65", 
    comprehensiveDetails:"Full Service Package, Vehicle Testing", comprehensivePrice: "90"},


    { id: 9, name: "Chevrollete", location: "Salmabad", imageName: "", 
    basicDetails:"Wheel & Brakes Care, Battery Service, Oil Change", basicPrice: "40",  
    standardDetails:"Basic Vehicle Service, Vehicle Engine Cleaning", standardPrice: "50", 
    comprehensiveDetails:"Full Service Package, Vehicle Testing", comprehensivePrice: "60"}

    
];

const ServicesPage = () => {
  return (
    <div>
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        Services
      </h2>
      <div className="mb-4"></div>
      <div className="row row-cols-1 row-cols-md-3">
        {serviceAgents.map(agent => (
          <div className="col mb-4">
            <Card key={agent.id} className="h-100">
              <Card.Body>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ flexGrow: 1 }}>
                    <Card.Img variant="top" src={serviceAgents.imageName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div>
                      <Card.Title>{agent.name}</Card.Title>
                      <Card.Text>{agent.basicDetails}</Card.Text>
                    </div>
                    <Link to={`/services/${agent.id}`} className="btn btn-info">View Details</Link>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

const BookingContext = createContext();

const ServiceDetailsPage = () => {
  const [currentAgency, setcurrentAgency] = useState(null);
  const { id } = useParams();

  const selectedAgent = serviceAgents.find(agent => agent.id === Number(id));

  const navigate = useNavigate();

  const handleBookButtonClick = () => {
    navigate("/booking");
    const selectedName=selectedAgent.name;
    console.log("Agency"+selectedName)
    setcurrentAgency(selectedName);
  };

  return (
    <div>
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        Service Details
      </h2>
      <div className="mb-4"></div>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Img variant="top" src={selectedAgent.imageName} />
              <Card.Title>{selectedAgent.name} Service</Card.Title>
              <br></br>
              <Card.Text>{"Find what you are looking for? Book now!"}</Card.Text>
              <Button onClick={handleBookButtonClick} className="btn btn-info">
                  Book
                </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <div className="d-flex flex-column">
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Basic Service</Card.Title>
                <Card.Text>{selectedAgent.basicDetails}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Standard Service</Card.Title>
                <Card.Text>{selectedAgent.standardDetails}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Comprehensive Service</Card.Title>
                <Card.Text>{selectedAgent.comprehensiveDetails}</Card.Text>
      
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ServicesPage;
export { ServiceDetailsPage };