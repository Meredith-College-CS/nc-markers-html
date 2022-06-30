var MongoClient = require('mongodb').MongoClient
const assert = require('assert');

var express = require('express');
const { request } = require('../app');

var router = express.Router();

const DB = 'nc-markers'
const COLLECTION = 'markers'
const URL = 'mongodb://localhost:27017'

async function getCollection() {
  const mongo = new MongoClient(URL)
  await mongo.connect()
  const db = mongo.db(DB)
  return collection = db.collection(COLLECTION)
}

async function getMarkersInCounty(coll, county) {
  const select = [
    {
      '$match': {
        county: county
      }
    }
  ]
  const countyMarkerCursor = coll.aggregate(select)
  const countyMarkers = await countyMarkerCursor.toArray()
  return countyMarkers
}

/* GET home page. */
router.get('/:county', async function(req, res, next) {
  const markersColl = await getCollection()
  const countyMarkers = await getMarkersInCounty(markersColl,  req.params.county)

  res.render('county', { county: req.params.county, markers: countyMarkers });
});

module.exports = router;
