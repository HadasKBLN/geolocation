const express = require('express');
const router = express.Router();
// const app = express();

router.get('/hello', async (req, res) => {
    // const t = await distance_api("Jerusalem", "Rehovot");
    // console.log(t);
    res.status(200);
    res.json();
});

module.exports = router;


