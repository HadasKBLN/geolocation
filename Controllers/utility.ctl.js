const MongoClient = require('mongodb').MongoClient;

// Connect to the db
const checkDbConnectivity = (req, res) => {
    MongoClient.connect("mongodb://127.0.0.1:27017/Geolocation", function (err, db) {
        if(err) {   
            res.status(500);
            res.json(err);
        }
        else{
            res.status(200);
            res.json();
        }        
    });
}

module.exports = {checkDbConnectivity};
