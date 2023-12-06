import { Outlet } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

import { useAuthorization } from './authorization';

const Layout = () => {
  const { userRole } = useAuthorization();

  return (
    <div className="bg-secondary" style={{ minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard">
            <img src="carLogo-1.png" alt="Logo" className="img-fluid" style={{ width: "100px", height: "auto" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard" className="text-info advent-pro-medium">Home</Nav.Link>
              <Nav.Link as={Link} to="/road-assistance" className="text-info advent-pro-medium">Road Assistance</Nav.Link>
              <Nav.Link as={Link} to="/services" className="text-info advent-pro-medium">Services</Nav.Link>
              <Nav.Link as={Link} to="/calendar" className="text-info advent-pro-medium">Calendar</Nav.Link>
              {userRole === "Service Provider" && (
                <Nav.Link as={Link} to="/history" className="text-info advent-pro-medium">History</Nav.Link>
              )}
            </Nav>
            <Nav>
                <Nav.Link as={Link} to="/managebookings" className="text-info">
                <img src="profile-icon.png" alt="Profile" className="img-fluid" style={{ width: "30px", height: "30px" }} />
              </Nav.Link>

            </Nav>
            {userRole === "admin" && (
              <Nav>
                <Nav.Link as={Link} to="/manageusers" className="text-info advent-pro-medium">Manage Users</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      <div className="container-fluid advent-pro-light">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;