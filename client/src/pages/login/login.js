import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (username.length >= 6 && username.length <= 15 && password.length >= 8 && password.length <= 20) {
            // console.log('Username:', username, 'Password:', password);
            axios.post('/api/auth/login', {
                username,
                password,
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.log(error));
        }
    };

    return (
        <div>
            Username: <input value={username} onChange={e => setUsername(e.target.value)} type="text"></input>
            Password: <input value={password} onChange={e => setPassword(e.target.value)} type="password"></input>
            <button onClick={() => handleSubmit()}>Submit</button>
        </div>
    );
};

export default Login;
