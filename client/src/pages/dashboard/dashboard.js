import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();
    const handleLogout = () => {
        axios.get('/api/auth/logout')
            .then(() => history.push('/'))
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
