require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conn = require('./config/connectionPool');

app.use(require('./controllers/testController'));

conn.dbTest()
    .then(() => {
        console.log('server.js dbTest() promise was resolved');
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        console.log('server.js dbTest() promise was rejected');
        app.get('/api/*', (req, res) => {
            res.status(500).json({ message: 'An error occurred connecting to the database! ' + error.message });
        });
    })
    .finally(() => {
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, 'client/build')));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client/build/index.html'));
            });
        }
    });

// const { mongodbConnect } = require('./config/connection');
// mongodbConnect()
//     .then(() => {
//         app.use('/api', require('./controllers'));
//     })
//     .catch((error) => {
//         app.get('/api/*', (req, res) => {
//             res.status(500).json({ message: 'An error occurred connecting to the database! ' + error.message });
//         });
//     })
//     .finally(() => {
//         if (process.env.NODE_ENV === 'production') {
//             app.use(express.static(path.join(__dirname, 'client/build')));
//             app.get('*', (req, res) => {
//                 res.sendFile(path.join(__dirname, 'client/build/index.html'));
//             });
//         }
//     });

const server = app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

module.exports = server;
