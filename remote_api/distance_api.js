const fetch = require('node-fetch');
const https = require('https');
const log4js = require('log4js');
const logger = log4js.getLogger();

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

const getDistance = async ( source, dest) => {
    const base_url = `https://www.merchak.org/route.json?`;
    const url = `${base_url}stops=${source}|${dest}`;
    return await fetch(url, {
        agent: httpsAgent}).
        then(response => response.json()).
        then( json => {console.log(json.distance);
        return json.distance;}).
        catch( err => {
            logger.fatal("Could not connect to merchak!", err)
            process.exit(1)
        });
};

module.exports = getDistance;