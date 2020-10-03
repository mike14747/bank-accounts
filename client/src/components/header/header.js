import React from 'react';
import AuthStatus from './subcomponents/authStatus';

const Header = () => {
    return (
        <div className="container-fluid bg-light border-bottom border-dark">
            <div className="row">
                <div className="col-6 text-left">
                    <h3>Bank Accounts</h3>
                </div>
                <div className="col-6 text-right">
                    <AuthStatus />
                </div>
            </div>
        </div>
    );
};

export default Header;
