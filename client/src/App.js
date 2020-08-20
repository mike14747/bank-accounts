import React from 'react';
import './css/my_style.css';
import './css/styles.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
    return (
        <div className="container h-100 border border-dark">
            <Header />
            <div className="h-100">
                <h1 className="px-4">Starter code for body in App.js</h1>
            </div>
            <Footer />
        </div>

    );
}

export default App;
