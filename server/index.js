const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const url = "mongodb://localhost:27017/";

app.get('/regions', function (req, res) {

    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("MapboxRegionJson");
    dbo.collection("510781").findOne({}, function(err, result) {
      if (err) throw err;
  
      db.close();

      res.send(result);
    });
  });
})

app.get('/groupitem', function (req, res) {

    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  const d3 = require('d3-dsv');
  const fs = require('fs');
  var content;

  fs.readFile('fake_data.csv', 'utf8', function read(err, data) {
      if (err) {
          throw err;
      }
      
      ret = d3.csvParse(data)

      res.send(ret);
  });
})

const server = app.listen(3001, function () {

  const host = 'server.address().address'
  const port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})