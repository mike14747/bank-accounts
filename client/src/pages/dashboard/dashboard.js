import React from 'react';
import axios from 'axios';

const Dashboard = () => {
    const handleLogout = () => {
        axios.get('/api/auth/logout')
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
