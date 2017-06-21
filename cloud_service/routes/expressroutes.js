const ObjectID = require('mongodb').ObjectID;
const express = require("express");
const path = require("path");
const mongo = require("../model/mongo");

const router = new express.Router();

router.get('/history/:name/:field', function(req, res) {

  console.log('history route hit', req.params);

  var arr = [];

  mongo.collection.find(
    {},
    {"telemetry.Solar Controller Monitor.current" : 1}
  ).map(function(doc) {

    if(doc.telemetry) {
      if(doc.telemetry["Solar Controller Monitor"].current) {

        return doc.telemetry["Solar Controller Monitor"].current;
      }
    }

  }).toArray(function(A) {

    res.json(A);


  });


});


module.exports = router;
