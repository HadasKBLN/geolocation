const express = require('express');
const router = express.Router();
const distanceCtl = require('../Controllers/distance.ctl');

router.get('/*', distanceCtl.getDistance);

router.post('/', distanceCtl.ingestPair);


module.exports = router;