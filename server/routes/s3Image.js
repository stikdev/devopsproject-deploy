const AWS = require('aws-sdk');
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const router = express.Router();

const s3 = new AWS.S3();

const bucketName = process.env.S3BUCKET || '';


/*
  GET to trigger the upload a file to the configured S3 bucket.

  This route requires:
  - creation and configuration of an S3 bucket for use by the application
  - proper configuration of security and authentication for the server process

  Returns:
    {
      fileURL: 'http://some/url/to/an/image.svg' or null if there is an error
    }
*/
router.get('/', function(req, res, next) {
  // Do nothing if the bucket name is not configured.
  if (!bucketName) {
    console.log('No bucket name configured in env.S3BUCKET.');
    res.json(
      {
        fileURL: null
      }
    );

    return;
  }

  const uuid = uuidv1();
  const remoteFileName = `${uuid}.svg`;

  const localFileName = path.join(__dirname, '/../files/wombat_outline.svg');

  // Read the body of the image from a local file.
  const imageBody = fs.readFileSync(localFileName, 'binary');

  const params =  {
    // Public so the web browser can see the image.
    ACL: 'public-read',
    Body: imageBody,
    Bucket: bucketName,
    // Set the mimetype or the browser will just download the image file.
    ContentType: 'image/svg+xml',
    Key: remoteFileName
  };

  console.log(`Uploading to ${bucketName}/${remoteFileName}`);
  s3.putObject(
    params,
    (err, data) => {
      let fileURL = null;

      if (err) {
        console.log(`ERROR: ${err}`);
      } else {
        fileURL = `https://s3.amazonaws.com/${bucketName}/${remoteFileName}`;
        console.log(`Success uploading file to ${fileURL}.`);
      }

      res.json(
        {
          fileURL
        }

      );
    }
  );
});

module.exports = router;
