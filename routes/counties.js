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



async function getListOfCounties(coll) {
  const agg = [
    {
      '$group': {
        '_id': '$county', 
        'numMarkers': {
          '$count': {}
        }
      }
    }, {
      '$sort': {
        '_id': 1
      }
    }
  ];
  const markersByCountyCursor = coll.aggregate(agg)
  const markersByCounty = await markersByCountyCursor.toArray()
  return markersByCounty
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  const mongo = new MongoClient(URL)
  try {
    await mongo.connect()
    const markersColl = await  getCollection(mongo)
    const markersByCounty = await getListOfCounties(markersColl)
    res.render('byCounty', { title: 'North Carolina Historical Markers', counties: markersByCounty });
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
