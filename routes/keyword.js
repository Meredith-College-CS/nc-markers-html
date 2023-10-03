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

//This function is used to get Markers by keyword 
async function getMarkersMentioning(coll, keyword) {
  const search = [
      {
        '$search': {
          'index': 'text-keywords',
          'text': {
            query: keyword,
            'path': {
              'wildcard': '*'
            }
          }
        }
      }
    ];
    const searchResultCursor = coll.aggregate(search)
    const markersWithKeyword = await searchResultCursor.toArray()
    return markersWithKeyword
  }

/* GET home page. */
router.get('/:keyword', async function(req, res, next) {
  const mongo = new MongoClient(URL)
  try {
    await mongo.connect()

    const markersColl = await getCollection(mongo)
    const markersWithKeyword = await getMarkersMentioning(markersColl,  req.params.keyword)
    res.render('keyword', { keyword: req.params.keyword, markers: markersWithKeyword });
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