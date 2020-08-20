import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/my_style.css';
import './css/styles.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <div className="container flex-fill bg-white border-left border-right border-dark">
                        <h1>Starter code for body in App.js</h1>
                    </div>
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
