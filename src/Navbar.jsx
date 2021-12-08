import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import axios from 'axios';

export default function Navbar() {
    const [username, setUsername] = useState({
        password: '',
        username: '',
    })

    function whoIsLoggedIn() {
        axios.get('/api/user/whoIsLoggedIn')
            .then(response => {
                setUsername(response.data);
            })
            .catch(error => console.error(error));
    }
    useEffect(whoIsLoggedIn, []);


    if (username) {
        return (
            <div class="navbarContainer">
                <Link exact to="/">Home Page</Link>
                <Link exact to={"/favorites/" + username}>Favorite Jobs</Link>
                <Link exact to={"/create/"}>Create New Job</Link>
                <button id="logout"
                    onClick={() => {
                        axios.delete('/api/user/logout')
                            .then(response => {
                                console.log(response);
                            })
                            .catch(error => console.log(error));
                        setUsername('');
                        window.location.replace("/");
                    }}
                >Logout</button>
            </div>
        )
    }
    else if (username == ''){
        return (
            <div class="navbarContainer">
                <Link exact to="/">Home Page</Link>
                <Link exact to="/login">LogIn or Sign up</Link>
            </div>
        )
    }
}