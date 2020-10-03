import React, { useContext, Fragment } from 'react';
import UserContext from '../../../context/userContext';
import axios from 'axios';

const Logout = () => {
    const { setUser } = useContext(UserContext);

    const handleLogout = () => {
        axios.get('/api/auth/logout')
            .then(() => setUser(null))
            .catch(error => console.log(error.message));
    };

    return (
        <Fragment>
            <a href="# " onClick={() => handleLogout()}>Logout</a>
        </Fragment>
    );
};

export default Logout;
