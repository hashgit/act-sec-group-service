const express = require('express');
const cors = require('cors');

const LogService = require('./services/log-service');
const TraceService = require('./services/trace-service');
const { SERVICE_NAME } = require('./configs/constants');
const groupsController = require('./controllers/groups-controller');

const app = express();

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(LogService.middleware())
  .use(TraceService.middleware())
  .use((req, res, next) => {
    req.log.debug('Processing request', {
      host: req.get('host'),
      path: req.path,
      query: req.query,
      headers: req.headers,
      body: req.body,
      context: req.requestContext
    });
    next();
  })
  .use([`/${SERVICE_NAME}`, '/'], groupsController)
  .use((err, req, res, next) => {
    req.log.error('Request processing error', err);
    next(err);
  });

module.exports = app;
