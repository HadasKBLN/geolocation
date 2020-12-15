const express = require('express');
const distanceRouter = require('./Routers/distance.router');
const utilityRouter = require('./Routers/utility.router');
const DB = require('./Models');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/distance', distanceRouter);
app.use('/', utilityRouter);

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});