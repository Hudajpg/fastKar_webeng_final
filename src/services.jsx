import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Row, Col } from 'react-bootstrap';
import React, { createContext, useState } from "react";
import serviceData from "./servicesinfo.json";

const ServicesPage = () => {
  return (
    <div>
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        Services
      </h2>
      <div className="mb-4"></div>
      <div className="row row-cols-1 row-cols-md-3">
        {serviceData.map(agent => (
          <div className="col mb-4">
            <Card key={agent.id} className="h-100">
              <Card.Body>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ flexGrow: 1 }}>
                    <Card.Img variant="top" src={agent.imageName} style={{ width: '40%', height: 'auto', objectFit: 'contain' }} />
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
  );}

const BookingContext = createContext();

const ServiceDetailsPage = () => {
  const [currentAgency, setcurrentAgency] = useState(null);
  const { id } = useParams();

  const selectedAgent = serviceData.find(agent => agent.id === Number(id));

  const navigate = useNavigate();

  const handleBookButtonClick = () => {
    navigate("/booking");
    const selectedName = selectedAgent.name;
    console.log("Agency" + selectedName);
    setcurrentAgency(selectedName);
  };

  
  return (
    <div>
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        Service Details
      </h2>
      <div className="mb-4"></div>
      <Card className="mb-3" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card.Body>
        <div className="mb-3"></div>
          <Card.Title className="text-center">{selectedAgent.name} Service</Card.Title>
          <div className="mb-3"></div>
          <hr />
          
          <div className="mb-4">
            <Card.Title className="text-center">Comprehensive Service</Card.Title>
            <Card.Text className="text-center">{selectedAgent.comprehensiveDetails}</Card.Text>
          </div>
          <div className="mb-4">
            <Card.Title className="text-center">Basic Service</Card.Title>
            <Card.Text className="text-center">{selectedAgent.basicDetails}</Card.Text>
          </div>
          <div className="mb-4">
            <Card.Title className="text-center">Standard Service</Card.Title>
            <Card.Text className="text-center">{selectedAgent.standardDetails}</Card.Text>
          </div>
          <Button onClick={handleBookButtonClick} className="btn btn-info d-block mx-auto">
            Book
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ServicesPage;
export { ServiceDetailsPage };