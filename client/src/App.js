import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/my_style.css';
import './css/styles.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Account from './pages/account/account';
import NoMatch from './pages/noMatch/noMatch';

function App() {
    return (
        <Router>
            <Header />
            <div className="container flex-fill bg-white border-left border-right border-dark">
                <Switch>
                    <Route exact path="/">
                        <h1>Starter code for body in App.js</h1>
                    </Route>
                    <Route exact path="/login"><Login /></Route>
                    <Route exact path="/dashboard"><Dashboard /></Route>
                    <Route exact path="/account"><Account /></Route>
                    <Route component={NoMatch} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
