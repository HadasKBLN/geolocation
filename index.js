const express = require('express');
const log4js = require('log4js');
const distanceRouter = require('./Routers/distance.router');
const utilityRouter = require('./Routers/utility.router');
const DB = require('./Models');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
const logger = log4js.getLogger();
logger.level = 'debug';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/distance', distanceRouter);
app.use('/', utilityRouter);

app.listen(PORT, HOST, () => {
    logger.info(`Running on http://${HOST}:${PORT}!`);
});