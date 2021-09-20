var express = require('express');
var router = express.Router();
const ndjson = require('ndjson');
const fs = require('fs');

let facedrawing = [],beardrawing = [],truckDrawing=[];
fs.createReadStream('../drawings/face.ndjson').pipe(ndjson.parse()).on(
  'data', function(obj){
    facedrawing.push(obj);
  });
  fs.createReadStream('../drawings/truck.ndjson').pipe(ndjson.parse()).on(
    'data', function(obj){
      truckDrawing.push(obj);
    });
    fs.createReadStream('../drawings/bear.ndjson').pipe(ndjson.parse()).on(
      'data', function(obj){
        beardrawing.push(obj);
      });
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  //const search_params = current_url.searchParams;
  const type = req.params.id;
  let index = 0;
  switch(type){
    case 'face' :   index = Math.floor(Math.random() * facedrawing.length);
                    res.send(facedrawing[index]);
                  break;
    case 'truck' :  index = Math.floor(Math.random() * truckDrawing.length);
                   res.send(truckDrawing[index]);
                  break;
    case 'bear' : index = Math.floor(Math.random() * beardrawing.length);
                  res.send(beardrawing[index]);
                  break;
    default : res.send([]);
  }
});



module.exports = router;
