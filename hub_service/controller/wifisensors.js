const net = require("net");
const ObjectID = require('mongodb').ObjectID;
const mongo = require("../model/mongo.js");

var packet = {};
var sensor = {};
var dataArr = [];
var count = 0;

const sensorServer = net.createServer(function(socket) {
  socket.on("data", function(data) {
    try {
      packet = JSON.parse(data);
      Object.assign(sensor, packet);
      sensor._id = new ObjectID();
      dataArr.push(sensor);
    } catch(err) {
      console.log('error at wireless sensor', err);
    }

    if(dataArr.length > 70) {
    //  sensor._id = new ObjectID();
      mongo.collection.insert(dataArr, function(err) {
        if(err) console.log('error at sensor mongo insert', err);
        console.log('sensor data inserted');
      })
      dataArr = [];
    }

  })
});

sensorServer.listen(3215, '192.168.10.1');

module.exports = sensor;
