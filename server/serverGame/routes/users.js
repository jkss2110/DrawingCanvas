var express = require('express');
var router = express.Router();
const ndjson = require('ndjson');
const fs = require('fs');

let drawing = [];
fs.createReadStream('../drawings/face.ndjson').pipe(ndjson.parse()).on(
  'data', function(obj){
     drawing.push(obj);
  });
/* GET users listing. */
router.get('/', function(req, res, next) {

  const index = Math.floor(Math.random() * drawing.length);
  res.send(drawing[index]);
});

module.exports = router;
