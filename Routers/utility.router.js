const express = require('express');
const router = express.Router();
const utilityCtl = require('../Controllers/utility.ctl')
// const app = express();

router.get('/hello', async (req, res) => {
    res.status(200);
    res.json();
});

router.get('/health', utilityCtl.checkDbConnectivity);

module.exports = router;


