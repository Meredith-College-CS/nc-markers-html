const assert = require('assert');

var express = require('express');
const { request } = require('../app');

var router = express.Router();

/* Form to search for marker ID: just gather query parameter for use in redirect. */
router.get('/searchById/submit', async function(req, res, next) {
  var tgtURL = `/marker/${req.query.markerid.toUpperCase()}`;
  res.redirect(307, tgtURL);
});

module.exports = router;
