const MongoClient = require('mongodb').MongoClient;
const Distance = require('../Models')('Distance');

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
};

const getPopularSearch = (req, res) => {
    Distance.findOne().sort({hits:-1}).limit(1).
        then( maxPopularSearch => {
            res.status(200);
            res.json({'source': maxPopularSearch.source, 
                      'destination': maxPopularSearch.destination, 
                      'hits': maxPopularSearch.hits});
        });
};

module.exports = {checkDbConnectivity, getPopularSearch};
