const url = require('url');
const distance_api = require('../remote_api/distance_api');
const Distance = require('../Models')('Distance');

const getDistance = async (req, res) => {

    const queryObject = url.parse(req.url,true).query;
    const src = queryObject['source'];
    const dest = queryObject['destination'];

    Distance.findOne({source: src, destination: dest}).exec().
    then( distanceData => {
        if (distanceData === null){
            calcAndAddDistance (res, src, dest);
        } 
        else{
            distance = distanceData.distance;
            const newHits = distanceData.hits+1;
            const distancID = distanceData._id;
            Distance.findOneAndUpdate({ _id: distancID }, {
                $set: {
                    hits: newHits
                }
            }, { new: true }, (err, doc) => {
                if(err !== null)
                    console.log('error while updating hits: '+ err)
            });
            res.status(200);
            res.json({'distance': distance});
        } 
    }).catch( err => {
        calcAndAddDistance (res, src, dest)
    });
};



const ingestPair = (req, res) => {
    const src = req.body.source;
    const dest = req.body.destination;
    const distance = req.body.distance;
    
    Distance.findOne({source: src, destination: dest}).exec().
    then( distanceData => {
        if (distanceData === null){
            addPair ( src, dest, distance, 0 );
        } 
        else{
            const distancID = distanceData._id;
            Distance.findOneAndUpdate({ _id: distancID }, {
                $set: {
                    distance: distance
                }
            }, { new: true }, (err, doc) => {
                if(err !== null)
                    console.log('error while updating distance: '+ err)
            });
        }
        res.status(200);
        res.json({'source': src, 
                  'destination': dest, 
                  'distance': distance}); 
    });
};

const calcAndAddDistance = (res, src, dest) => {
    distance_api(src, dest).
        then( distance => {
            addPair(src, dest, distance, 1);
            res.status(200);
            res.json({'distance': distance});            
        }); 
};

const addPair = (src, dest, distance, hits) => {
    const newDistance = new Distance({
        source: src,
        destination: dest,
        distance: distance,
        hits: hits
    });
    newDistance.save()
        .catch( err => {
            console.log('err: '+ err);
            throw err;
            });
};



module.exports = { getDistance , ingestPair};