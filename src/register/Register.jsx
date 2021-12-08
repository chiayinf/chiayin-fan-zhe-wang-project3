import axios from 'axios';
import React, {useState} from 'react';




export default (props) =>{
    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    return (
        <div>
            <h3>Sign up a new account</h3>
            <h5>Username:</h5>
            <input value={userData.username} onChange={(e) => {
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username: username
                })
            }}/>
            <h5>Password:</h5>
            <input value={userData.password} onChange={(e) => {
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password: password
                })
            }} type='password' />


            <button
                onClick={() => {
                    axios.post('/api/user/insertUser', userData)
                        .then(response => {
                            console.log(response);
                            axios.post('/api/user/authenticate', userData)
                                .then(authResponse => {
                                    console.log(authResponse);
                                    window.location.replace("/");
                                })
                                .catch(authError => console.log(authError));
                        })
                        .catch(error => {
                            console.log(error);
                            alert("Username already exists!");
                        });
                }}
            >Register New User</button>


            
        </div>
    );
}