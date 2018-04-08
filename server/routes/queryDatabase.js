const { Client } = require('pg');
const express = require('express');

const router = express.Router();


/*
  GET to query the database.

  This route requires:
  - deployment and configuration of a PostgreSQL RDS instance
  - proper configuration of security, authentication, and network connectivity
    for the server process
  - configuration of the RDS host endpoint for the server process via the
    PGHOST environment variable
  - configuration of the RDS database user for the server process via the
    PGUSER environment variable
  - configuration of the RDS database password for the server process via the
    PGPASSWORD environment variable
  - configuration of the RDS database name for the server process via the
    PGDATABASE environment variable
  - (optional) configuration of the RDS port for the server process via the
    PGPORT environment variable

  Returns:
    {
      currentTime: "2018-04-09T17:50:00.814Z", or null if there is an error.
    }
*/
router.get('/', function(req, res, next) {
  // Do nothing if the database endpoint is not configured.
  if (!process.env.PGHOST) {
    console.log('No database host configured in env.PGHOST.');
    res.json(
      {
        currentTime: null
      }
    );

    return;
  }

  console.log(`Connecting to database at ${process.env.PGHOST}...`);
  const databaseClient = new Client();

  databaseClient.connect().then(
    result => {
      console.log('Connected to database.');

      console.log(`Querying ${process.env.PGHOST}`);
      databaseClient.query('SELECT current_timestamp;').then(
        result => {
          console.log('Query result:', result);
          databaseClient.end();
          res.json(
            {
              currentTime: result.rows[0].now
            }
          );
        }
      ).catch(
        err => {
          console.log(`Query error: ${err}`);
          databaseClient.end();
        }
      );
    }
  ).catch(
    err => {
      console.log(`Connection error: ${err}`);
    }
  );

});

module.exports = router;
