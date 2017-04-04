
var connection = require('../db');

const express = require('express');
const router = express.Router();

router.all('*', function(req, res){
  console.log(req.path);
});

router.post('/device', function(req, res){
  console.log("Device received: ");
  console.log(req.body);

  connection.query(
    'INSERT INTO device (SN, API) VALUES (?, 42)', [req.body.device],
                     function (error, results, fields) {
   if (error) throw error;

  });

  res.status(200);
  res.send("{\"success\":\"true\"}");
});




router.get('/device', function(req, res){
  
  connection.query(
    'SELECT * FROM device',
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(results);
    }

  });
});

/* GET api listing. */
router.get('/', function(req, res) {
  res.status(200);
  res.send("{\"success\":\"true\"}");
});



router.get('/data', function(req, res) {

  connection.query(
    'SELECT TOE1`, time FROM measurement ORDER BY time DESC LIMIT 0,10',
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(JSON.stringify(results));
    }

  });

});


module.exports = router;
