import axios from 'axios';
import React, {useState} from 'react';




export default (props) =>{
    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    
    console.log(window.location.href); 
    return (
        <div>
            <h3>Login</h3>
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
                    axios.post('/api/users/authenticate', userData)
                        
                        .then(response => {
                            alert("login succeed");
                            window.history.back()
                        })
                        .catch(error => {
                            alert("Please enter the correct username or password!")
                        }); 
                }}
            >Click to login</button>


            
        </div>
    );
}