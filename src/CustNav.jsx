import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function CustNav() {
  const [user, setUser] = useState({
    username: "",
  });

  function whoIsLoggedIn() {
    axios
      .get("/api/users/whoIsLoggedIn")
      .then((response) => {
        setUser({
          ...user,
          username: response.data,
        });
      })
      .catch((error) => console.error(error));
  }
  useEffect(whoIsLoggedIn, []);
  if (user.username) {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav.Link href="/favorite">Favorite Jobs</Nav.Link>
                <Nav.Link href="/create">Create New Job</Nav.Link>
                <Nav.Link href="/job">Check All jobs</Nav.Link>
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                
                
                <Nav>
                  <Nav.Link>Hi {user.username}</Nav.Link>
                  <Button
                  variant="secondary"
                  onClick={() => {
                    axios
                      .post("/api/users/logout")
                      .then((response) => {
                        console.log(response, "x");
                      })
                      .catch((error) => console.log(error));
                    setUser({
                      username: "",
                    });
                    window.location.replace("/");
                  }}
                >
                  Logout
                </Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav.Link href="/job">Check All jobs</Nav.Link>
                <Nav.Link href="/login">LogIn</Nav.Link>
                <Nav.Link href="/register">Sign up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
