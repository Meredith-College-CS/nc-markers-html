var MongoClient = require('mongodb').MongoClient

var express = require('express');
const { request } = require('../app');
var router = express.Router();

const DB = process.env.DB || 'nc-markers'
const COLLECTION = process.env.COLLECTION || 'markers'
const URL = process.env.URL || 'mongodb://localhost:27017'


async function getCollection() {
  const mongo = new MongoClient(URL)
  await mongo.connect()
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
  const markersColl = await getCollection()
  const markerDoc = await getOneDoc(markersColl, req.params.markerID)
  res.render('index', { title: 'North Carolina Historical Markers', marker: markerDoc });
});

module.exports = router;
