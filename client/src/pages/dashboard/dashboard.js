import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const handleLogout = () => {
        axios.get('/api/auth/logout')
            .then(() => {
                return <Redirect to="/login" />;
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
};

export default Dashboard;
