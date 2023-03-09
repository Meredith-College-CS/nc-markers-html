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

module.exports = router;
