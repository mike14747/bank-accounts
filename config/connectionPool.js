const { MongoClient } = require('mongodb');
let db;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 20,
};

const mongodbConnect = async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI, options);
        db = client.db();
        return;
    } catch (error) {
        console.log(error);
    }
};

const dbTest = () => {
    return new Promise((resolve, reject) => {
        db.command({ ping: 1 }, function (error, result) {
            if (error) reject(error);
            resolve(result);
        });
    });
};

const getDb = () => db;

module.exports = { mongodbConnect, getDb, dbTest };
