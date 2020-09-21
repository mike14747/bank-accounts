import React from 'react';
import Header from '../../components/header/header';

const Home = () => {
    return (
        <div>
            <p>
                Welcome to bank-accounts homepage.
            </p>
            <p>
                From here you can:
                <ul>
                    <li>Create accounts</li>
                    <li>Manage balances</li>
                    <li>Sort transactions</li>
                </ul>
            </p>
        </div>
    );
};

export default Home;
