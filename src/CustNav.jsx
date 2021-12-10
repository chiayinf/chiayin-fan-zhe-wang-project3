import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function CustNav() {
    const [user, setUser] = useState({
        username: "",
    });

    function whoIsLoggedIn() {
        console.log("check");
        axios
            .get("/api/users/whoIsLoggedIn")
            .then((response) => {
                setUser({
                    ...user,
                    username: response.data,
                });

                console.log("test2", response.data);
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
                            
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    Hi {user.username} 
                                </Navbar.Text>
                                <button
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
                            </button>
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
