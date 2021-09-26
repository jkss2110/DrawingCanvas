var express = require('express');
var router = express.Router();
const ndjson = require('ndjson');
const fs = require('fs');

let facedrawing = [],beardrawing = [],truckDrawing=[],
mountainDrawing=[],sunDrawing=[],rainbowDrawing=[],riverDrawing=[],
animalmigration=[],flowerDrawing=[];
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
fs.createReadStream('../drawings/mountain.ndjson').pipe(ndjson.parse()).on(
      'data', function(obj){
        mountainDrawing.push(obj);
      });
fs.createReadStream('../drawings/sun.ndjson').pipe(ndjson.parse()).on(
      'data', function(obj){
        sunDrawing.push(obj);
      });
fs.createReadStream('../drawings/river.ndjson').pipe(ndjson.parse()).on(
      'data', function(obj){
        riverDrawing.push(obj);
      });
fs.createReadStream('../drawings/rainbow.ndjson').pipe(ndjson.parse()).on(
      'data', function(obj){
        rainbowDrawing.push(obj);
      });
fs.createReadStream('../drawings/animalmigration.ndjson').pipe(ndjson.parse()).on(
      'data', function(obj){
        animalmigration.push(obj);
      });
fs.createReadStream('../drawings/flower.ndjson').pipe(ndjson.parse()).on(
      'data', function(obj){
        flowerDrawing.push(obj);
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
    case 'mountain' : index = Math.floor(Math.random() * mountainDrawing.length);
                  res.send(mountainDrawing[index]);
                  break;
    case 'sun' : index = Math.floor(Math.random() * sunDrawing.length);
                  res.send(sunDrawing[index]);
                  break;
    case 'river' : index = Math.floor(Math.random() * riverDrawing.length);
                  res.send(riverDrawing[index]);
                  break;
    case 'rainbow' : index = Math.floor(Math.random() * rainbowDrawing.length);
                  res.send(rainbowDrawing[index]);
                  break;
    case 'animalmigration' : index = Math.floor(Math.random() * animalmigration.length);
                  res.send(animalmigration[index]);
                  break;    
    case 'flower' : index = Math.floor(Math.random() * flowerDrawing.length);
                  res.send(flowerDrawing[index]);
                  break;   
    default : res.send([]);
  }
});



module.exports = router;
