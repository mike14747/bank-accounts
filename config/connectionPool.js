// const { MongoClient } = require('mongodb');
// let db;

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     poolSize: 20,
// };

// const mongodbConnect = async () => {
//     const client = await MongoClient.connect(process.env.MONGODB_URI, options);
//     db = client.db();
//     return db;
// };

// const getDb = () => db;

// module.exports = { mongodbConnect, getDb };

// ------------------------------

// let client;
// async function run() {
//     try {
//         await client.connect();
//         await client.db('admin').command({ ping: 1 });
//     } catch (error) {
//         console.log(error);
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);

// ------------------------------

// const { MongoClient } = require('mongodb');
// let client = null;

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     poolSize: 20,
// };

// function mongodbConnect() {
//     client = new MongoClient(process.env.MONGODB_URI, options);
//     client.connect((error) => {
//         if (error) console.log(error);
//     });
// }

// const dbTest = async () => {
//     // console.log('client in connectionPool.js', client);
//     try {
//         const pingResult = await client.db().command({ ping: 1 });
//         return pingResult;
//     } catch (error) {
//         console.log(error);
//     }
// };

// function getDb() {
//     return client.db();
// }

// module.exports = {
//     mongodbConnect,
//     getDb,
//     dbTest,
// };

// ------------------------------

const { MongoClient } = require('mongodb');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 20,
};

let db;

MongoClient.connect(process.env.MONGODB_URI, options, function (error, client) {
    if (error) console.log(error);

    db = client.db();
    console.log('db just got set');
});

const dbTest = () => {
    return new Promise((resolve, reject) => {
        console.log('inside dbTest Promise in connectionPool.js');
        const pingResult = db.command({ ping: 1 });
        console.log(pingResult);
        if (db) resolve();
        reject();
    });
};

const getDb = () => db;

module.exports = {
    getDb,
    dbTest,
};
