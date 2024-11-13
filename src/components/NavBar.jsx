import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import { auth } from "../lib/firebase"; // assuming you're using Firebase for authentication

function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Clean up listener
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);  // Reset user state on logout
    navigate("/"); // Redirect to home page using useNavigate
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Bookify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/action1">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action2">Another Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/separated-link">Separated Link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="ms-auto">
            {/* Show Login and Sign Up only when user is not logged in */}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-primary">Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Nav.Link>
              </>
            )}

            {/* Show Profile, Notifications and Logout only when user is logged in */}
            {user && (
              <>
                <Nav.Link as={Link} to="/notifications">
                  <Button variant="outline-secondary">Notifications</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <Button variant="outline-secondary">Profile</Button>
                </Nav.Link>
                <Nav.Link as={Link} onClick={handleLogout}>
                  <Button variant="outline-danger">Logout</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
