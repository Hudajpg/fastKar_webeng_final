import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

const RoadAssistance = () => {
  const [selectedPhone, setSelectedPhone] = useState(null);

  const roadAssistanceAgents = [
    {
      id: 1,
      agency: "Road Assistance Bahrain",
      agent: "Ali Saad",
      phone: "+973-12345678"
    },
    {
      id: 2,
      agency: "Road Rescue Bahrain",
      agent: "Jassim Ali",
      phone: "+973-98765432"
    },
    {
      id: 3,
      agency: "Auto Assist Bahrain",
      agent: "Mohammed Ali",
      phone: "+973-55555555"
    },
    {
      id: 4,
      agency: "Car Care Bahrain",
      agent: "Ahmed Ali",
      phone: "+973-11111111"
    },
    {
      id: 5,
      agency: "Emergency Roadside Bahrain",
      agent: "Khalid Hassan",
      phone: "+973-99999999"
    },
    {
      id: 6,
      agency: "Vehicle Help Bahrain",
      agent: "Khalifa Rashed",
      phone: "+973-77777777"
    },
    {
      id: 5,
      agency: "Emergency Roadside Bahrain",
      agent: "Khalid Hassan",
      phone: "+973-99999999"
    },
    {
      id: 6,
      agency: "Vehicle Help Bahrain",
      agent: "Khalifa Rashed",
      phone: "+973-77777777"
    },
    {
      id: 6,
      agency: "Vehicle Help Bahrain",
      agent: "Khalifa Rashed",
      phone: "+973-77777777"
    }
  ];

  const handleCall = (phone) => {
    setSelectedPhone(phone);
  };

  const handleClose = () => {
    setSelectedPhone(null);
  };

  return (
    <>
      <div className="mb-4"></div>
      <h2 className="text-center text-light font-light" style={{ fontFamily: 'Advent Pro' }}>
        Road Assistance
      </h2>
      <div className="mb-4"></div>
      <Container fluid className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Row className="justify-content-center align-items-center">
          {roadAssistanceAgents.map((agent) => (
            <Col md={4} key={agent.id} className="mb-4">
              <Card className="h-50">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{agent.agency}</Card.Title>
                    <Card.Text>{agent.agent}</Card.Text>
                  </div>
                  <Button
                    variant="info"
                    onClick={() => handleCall(agent.phone)}
                    className="align-self-end"
                  >
                    Call
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={selectedPhone !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedPhone}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoadAssistance;