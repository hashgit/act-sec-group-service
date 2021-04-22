const serverless = require('serverless-http');
const app = require('./app');
const authorizer = require('./authorizer');

module.exports = {
    handler: serverless(app),
    authorizer
};
