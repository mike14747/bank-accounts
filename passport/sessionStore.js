const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionOptions = {
    url: process.env.MONGODB_URI,
    touchAfter: 24 * 3600,
};

const sessionStore = new MongoStore(sessionOptions);

module.exports = sessionStore;
