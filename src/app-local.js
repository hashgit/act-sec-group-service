require('dotenv').config({path: __dirname + '/../.env', debug: true})

const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({
	profile: 'default',
	region: 'ap-southeast-2'
});
AWS.config.update({ region: 'ap-southeast-2', credentials });

const app = require('./app');

process.env.LOG_LEVELS="DEBUG";
app.set('storageMock', [{ id: '1' }]);

app.listen(3000, () => console.log(`Listening on: 3000`));
