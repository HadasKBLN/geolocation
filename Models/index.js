const mongoose = require('mongoose');

const db = mongoose.createConnection();

console.log('Creating a DB');
(async () => {
    try {
        await db.openUri('mongodb://127.0.0.1:27017/Geolocation', 
                        { useNewUrlParser: true , useUnifiedTopology: true });
    } catch (err) {
        console.log('Error connecting to DB: ' + err);
    }
})();
console.log('Pending DB connection');

require("./Distance")(db); 

module.exports = model => db.model(model);