var MongoClient = require('mongodb').MongoClient

var express = require('express');
const { request } = require('../app');
var router = express.Router();

const DB = process.env.DB || 'nc-markers'
const COLLECTION = process.env.COLLECTION || 'markers'
const URL = process.env.URL || 'mongodb://localhost:27017'
const MAPS_KEY = process.env.MAPS_KEY || "add the bings map key to your .env file"

async function getCollection(mongo) {

  const db = mongo.db(DB)
  return collection = db.collection(COLLECTION)
}

async function getOneDoc(coll, id) {
  const query = { markerID: id }
  const markerDoc = await coll.findOne(query)
  return markerDoc
}


/* GET home page. */
router.get('/:markerID', async function(req, res, next) {
  const mongo = new MongoClient(URL)
  try {
    await mongo.connect()
    const markersColl = await getCollection(mongo)
    const markerDoc = await getOneDoc(markersColl, req.params.markerID)
    res.render('marker', { title: 'North Carolina Historical Markers', marker: markerDoc, keys: { bingMapsKey: MAPS_KEY}});
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
