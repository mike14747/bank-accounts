import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import Logout from '../subcomponents/logout';

const AuthStatus = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            {user
                ? <Fragment>
                    <div>
                        Logged in as: {user.username}
                    </div>
                    <div>
                        <Logout />
                    </div>
                </Fragment>
                : <Fragment>
                    <Link to="/login">Login</Link>
                </Fragment>
            }
        </div>
    );
};

export default AuthStatus;
