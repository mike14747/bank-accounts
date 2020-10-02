import React, { useState, useContext } from 'react';
import UserContext from '../../context/userContext';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const userContext = useContext(UserContext);

    const loginUser = (user) => {
        userContext.setUser(user);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username.length >= 6 && username.length <= 15 && password.length >= 8 && password.length <= 20) {
            axios.post('/api/auth/login', { username, password })
                .then((response) => {
                    loginUser(response.data.user);
                })
                .catch(error => console.log(error.message));
        }
    };

    return (
        <div className="my-4">
            <form onSubmit={handleSubmit}>
                <label className="mr-2">Username:</label><input value={username} onChange={e => setUsername(e.target.value)} type="text"></input>
                <label className="mx-2">Password:</label><input value={password} onChange={e => setPassword(e.target.value)} type="password"></input>
                <button className="mx-4" type="submit">Submit</button>
            </form>
            <a href="/">Home</a>
        </div>
    );
};

export default Login;
