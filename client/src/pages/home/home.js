import React from 'react';

const Home = () => {
    return (
        <div>
            <p>
                Welcome to bank-accounts homepage.
            </p>
            <p>
                From here you can:
            </p>
            <ul>
                <li>Create accounts</li>
                <li>Manage balances</li>
                <li>Sort transactions</li>
            </ul>
            <p>
                <a href="/login">Login</a>
            </p>
            <p>
                <a href="/dashboard">Dashboard</a>
            </p>
        </div>
    );
};

export default Home;
