const assert = require('assert');

var express = require('express');
const { request } = require('../app');
const { search } = require('./keyword');

var router = express.Router();

/* Form to search for marker ID: just gather query parameter for use in redirect. */
router.get('/searchById/submit', async function(req, res, next) {
  var tgtURL = `/marker/${req.query.markerid.toUpperCase()}`;
  res.redirect(307, tgtURL);
});

router.get('/searchByKey/submit', async function(req, res, next) {
  var tgtURL = `/keyword/${req.query.keyword}`;
  res.redirect(307, tgtURL);
});

router.get('/markersInCounty/submit', async function(req, res, next) {
  var mURL = `/county/${req.query.county}`;
  res.redirect(307, mURL);
});
  
module.exports = router;
