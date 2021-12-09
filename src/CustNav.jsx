import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function CustNav() {
  const [user, setUser] = useState({
    username: "",
  });

  const [loggedInName, setLoggedInName] = useState("");

  function whoIsLoggedIn() {
    console.log("check");
    axios
      .get("/api/users/whoIsLoggedIn")
      .then((response) => {
        setUser({
          ...user,
          username: response.data,
        });
        setLoggedInName(response.data);
        console.log("test2", user);
      })
      .catch((error) => console.error(error));
  }
  useEffect(whoIsLoggedIn, []);
  console.log("username", user.username);

  if (user.username) {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="/">Home Page</Nav.Link>
                <Nav.Link href="/favorite">Favorite Jobs</Nav.Link>
                <Nav.Link href="/create">Create New Job</Nav.Link>
              </Nav>
              <button
                onClick={() => {
                  axios
                    .delete("/api/users/logout")
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => console.log(error));
                  setUser({
                    username: "",
                  });
                  window.location.replace("/");
                }}
              >
                Logout
              </button>
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
                <Nav.Link href="/">Home Page</Nav.Link>
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
