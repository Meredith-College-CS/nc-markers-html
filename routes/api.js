var MongoClient = require('mongodb').MongoClient
const assert = require('assert');

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

async function getListOfCounties(coll) {
  const agg = [
    {
      '$group': {
        '_id': '$county'
      }
    }, {
      '$sort': {
        '_id': 1
      }
    }
  ];
  const countiesCursor = coll.aggregate(agg)
  const counties = await countiesCursor.toArray()
  return counties
}

/* GET counties list. */
router.get('/counties', async function(req, res, next) {
  const markersColl = await  getCollection()
  const countiesMongo = await getListOfCounties(markersColl)
  const counties = countiesMongo.map(element => {
    return element._id
  });
  res.json(counties);
});

async function getListOfMarkers(coll) {

  const fields = {
    '_id': 0,
    'markerID': 1,
    'title': 1
  }

  const markersCursor = coll.find({}).project(fields).sort({"markerID":1})
  const markers = await markersCursor.toArray()
  return markers
}

/* GET markers list. */
router.get('/marker', async function(req, res, next) {
  const markersColl = await  getCollection()
  const markersMongo = await getListOfMarkers(markersColl)
  const markers = markersMongo.map(element => {
    return element.markerID + " " + element.title
  });
  res.json(markers);
});


async function byPrefix(coll, prefix) {

  const fields = {
    '_id': 0,
    'markerID': 1,
    'title': 1
  }

  const sectionLimit = {"markerID" : {"$regex" : "^" + prefix}}
  const markersCursor = coll.find(sectionLimit).project(fields).sort({"markerID":1})
  const markers = await markersCursor.toArray()
  return markers
}

/* GET markers prefix. */
router.get('/markerPrefix/:prefix', async function(req, res, next) {
  const markersColl = await  getCollection()
  const markersMongo = await byPrefix(markersColl, req.params.prefix)
  const markers = markersMongo.map(element => {
    return element.markerID + " " + element.title
  });
  res.json(markers);
});


module.exports = router;
