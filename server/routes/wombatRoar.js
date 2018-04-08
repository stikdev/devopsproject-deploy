var AWS = require('aws-sdk');
const express = require('express');

const router = express.Router();

AWS.config.region = process.env.LAMBDA_REGION || 'us-west-1';
var lambda = new AWS.Lambda();


/*
  GET what the wombat says.

  This route requires:
  - compilation and deployment of the Lambda function to AWS
  - proper configuration of security and authentication for the server process
  - (optional) configuration of the Lambda region for the server process via
    the LAMBDA_REGION environment variable
  - (optional) configuration of the Lambda function name for the server process
    via the LAMBDA_NAME environment variable

  Returns:
    {
      message: "What the wombat said."
    }
*/
router.get('/', function(req, res, next) {

  var params = {
    FunctionName: process.env.LAMBDA_NAME || 'wombat_roar',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: '{ "whoIsAsking" : "Waymark" }'
  };

  lambda.invoke(params, function(err, data) {

    if (err) {
      console.log('Error calling the wombat lambda:', err);
      res.json({
        error: err
      });

    } else {
      console.log('Success calling the wombat lambda:', data.Payload);
      const payload = JSON.parse(data.Payload);
      res.json({
        message: payload.message
      });
    }
  });


});

module.exports = router;
