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
            distance_api(src, dest).
                then( distance => {
                    const newDistance = new Distance({
                        source: src,
                        destination: dest,
                        distance: distance,
                        hits: 1
                    });
                    newDistance.save()
                    .catch( err => {
                        console.log('err: '+ err);
                        throw err;
                        });
                    res.status(200);
                    res.json({'distance': distance});            
                }); 
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
    });
};

module.exports = { getDistance };