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
            <h3>Login or Sign up a new account</h3>
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
                             
                            //console.log(response);
                            console.log(userData.username, 'curUrl')
                            //window.location.replace("/");
                            window.history.back()
                        })
                        .catch(error => {
                            console.log(error);
                            alert("Please enter the correct username or password!")
                        }); 
                }}
            >Click to login</button>


            
        </div>
    );
}