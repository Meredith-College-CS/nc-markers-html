var MongoClient = require('mongodb').MongoClient
const assert = require('assert');

var express = require('express');
const { request } = require('../app');

var router = express.Router();

const DB = process.env.DB || 'nc-markers'
const COLLECTION = process.env.COLLECTION || 'markers'
const URL = process.env.URL || 'mongodb://localhost:27017'

async function getCollection(mongo) {
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
  const mongo = new MongoClient(URL)
  try {
    await mongo.connect()
    const markersColl = await getCollection(mongo)
    const countyMarkers = await getMarkersInCounty(markersColl,  req.params.county)
    res.render('county', { county: req.params.county, markers: countyMarkers });
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500);
  }
  finally {
    await mongo.close()
  }
});

module.exports = router;
