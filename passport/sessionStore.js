const client = require('../config/connectionPool').getClient();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionOptions = {
    client: client,
    touchAfter: 24 * 3600,
};

const sessionStore = new MongoStore(sessionOptions);

module.exports = sessionStore;
