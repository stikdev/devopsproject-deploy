var express = require('express');
var router = express.Router();

/*
  GET a list of things.

  This route requires:
  - configuration of the server process to allow API requests from the browser

  Returns:
    [
      {
        id: unique numeric id,
        description: "The description of the thing."
      },
      ...
    ]
*/
router.get('/', function(req, res, next) {

  res.json(
    [
      {
        id: 1,
        description: "Find a wombat."
      },
      {
        id: 2,
        description: "..."
      },
      {
        id: 3,
        description: "Profit!"
      }
    ]
  );

});

module.exports = router;
