const debug = require('debug')('models.index');
const mongoose = require('mongoose');

const db = mongoose.createConnection();

debug('Creating a DB');
console.log('Creating a DB');
(async () => {
    try {
        await db.openUri('mongodb://127.0.0.1:27017/Geolocation');
    } catch (err) {
        debug('Error connecting to DB: ' + err);
        console.log('Error connecting to DB: ' + err);
    }
})();
debug('Pending DB connection');

require("./Distance")(db); 

module.exports = model => db.model(model);