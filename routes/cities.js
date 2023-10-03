var MongoClient = require('mongodb').MongoClient
const assert = require('assert');

var express = require('express');
const { request } = require('../app');

var router = express.Router();

const DB = process.env.DB || 'nc-markers'
const COLLECTION = process.env.CITIES_COLLECTION || 'Cities'
const URL = process.env.URL || 'mongodb://localhost:27017'

async function getCollection(mongo) {
  const db = mongo.db(DB)
  return collection = db.collection(COLLECTION)
}

async function getListOfCities(coll) {
  const agg = [
    {
      '$group': {
        '_id': '$City', 
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
  const markersByCityCursor = coll.aggregate(agg)
  const markersByCity = await markersByCityCursor.toArray()
  return markersByCity
}

/* GET home page. */
router.get('/citiesDP', async function(req, res, next) {
  const mongo = new MongoClient(URL)
  try {
    await mongo.connect()
    const markersColl = await  getCollection(mongo)
    const markersByCity = await getListOfCities(markersColl)
    const cities = markersByCity.map(element => {
      return element._id
    });
    res.json(cities);
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
