//const mongodb = require('mongodb');
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = 'mongodb+srv://mongo-user11:asE0gCaYMjX8c2wE@cluster0.mpn7q.mongodb.net/company?retryWrites=true&w=majority';

let _db;

const initDb = callback => {
    if (_db) {
        console.log('Database is already initialized');
        return callback(null, _db);
    }
    MongoClient.connect(mongoDbUrl)
        .then(client => {
            _db = client;
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
    });
};

const getDb = () => {
    if (!_db) {
        throw Error('Database is not initialized');
    }
    return _db;
};

/* module.exports = {
    initDb,
    getDb
} */

//export default db;
//export default {initDb, getDb};
export default {
    initDb,
    getDb
}
