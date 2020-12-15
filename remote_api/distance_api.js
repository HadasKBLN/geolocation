const fetch = require('node-fetch');

const getDistance = async ( source, dest) => {
    const base_url = `https://www.merchak.org/route.json?`;
    const url = `${base_url}stops=${source}|${dest}`;
    console.log(url);
    return await fetch(url).
        then(response => response.json()).
        then( json => {console.log(json.distance);
        return json.distance;}).
        catch( err => {
            console.log(err);
            throw err;
        });
};

module.exports = getDistance;