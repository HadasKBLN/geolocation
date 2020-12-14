const express = require('express');
const router = express.Router();
const distanceCtl = require('../Controllers/distance.ctl');

router.get('/*', distanceCtl.getDistance);

router.post('/', async (req, res) => {
    // const t = await distance_api("Jerusalem", "Rehovot");
    // console.log(t);
    console.log('HIII');
    res.status(200);
    res.json();
});


module.exports = router;