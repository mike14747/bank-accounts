const pool = require('../config/connectionPool').getDb();

const session = require('express-session');

// change this to "connect-mongo"
// const MySQLStore = require('express-mysql-session')(session);
const MongoStore = require('connect-mongo')(session);

const sessionOptions = {
    // old options
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USER,
    // password: process.env.DB_PW,
    // database: process.env.DB_NAME,
    // new options
    clientPromise: pool,
    touchAfter: 24 * 3600,
};

// const sessionStore = new MongoStore(sessionOptions, pool);
const sessionStore = new MongoStore(sessionOptions);

module.exports = sessionStore;
