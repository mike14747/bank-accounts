import React from 'react';

const Header = () => {
    return (
        <div className="container-fluid bg-light border-bottom border-dark">
            <div className="row">
                <div className="col-6 text-left">
                    <h3>Bank Accounts</h3>
                </div>
                <div className="col-6 text-right">
                    Logged in as: mike
                </div>
            </div>
        </div>
    );
};

export default Header;
