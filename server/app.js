const express = require('express');
const path = require('path');
const logger = require('morgan');

const thingsRouter = require('./routes/things');
const s3ImageRouter = require('./routes/s3Image');
const queryDatabaseRouter = require('./routes/queryDatabase');
const wombatRoarRouter = require('./routes/wombatRoar');

const app = express();

app.use(logger('dev'));

// Serve the client files from the client directory.
app.use(express.static(path.join(__dirname, '/../client/build')));

app.use('/api/things', thingsRouter);
app.use('/api/s3Image', s3ImageRouter);
app.use('/api/currentTime', queryDatabaseRouter);
app.use('/api/askTheWombat', wombatRoarRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

const port = 3001;
console.log(`Listening on port ${port} for great justice.`);
if (port > 9000) {
  console.log('The port is OVER 9000!');
}
app.listen(port);

module.exports = app;
