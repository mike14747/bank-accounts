import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log('Username:', username, 'Password:', password);
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
