import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import UserContext from './context/userContext';
import ProtectedRoute from './utils/protectedRoute';
import axios from 'axios';

import './css/my_style.css';
import './css/styles.css';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Account from './pages/account/account';
import NoMatch from './pages/noMatch/noMatch';
import Home from './pages/home/home';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('/api/auth/status')
            .then(response => {
                response.status === 200 ? setUser(response.data.user) : setUser(null);
            })
            .catch((error) => {
                console.log(error);
                setUser(null);
            });
    }, []);

    return (
        <Router>
            <UserContext.Provider value={[user, setUser]}>
                <Header />
                <div className="container flex-fill bg-white border-left border-right border-dark">
                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route exact path="/login">
                            {user ? <Redirect to="/dashboard" /> : <Login />}
                        </Route>
                        <ProtectedRoute exact path="/dashboard" component={Dashboard} user={user} />
                        <ProtectedRoute exact path="/account" component={Account} user={user} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
                <Footer />
            </UserContext.Provider>
        </Router>
    );
}

export default App;
