
var connection = require('../db');

const express = require('express');
const router = express.Router();

router.all('*', function(req, res){
  console.log(req.path);
  req.next();
});


router.get('/device', function(req, res){
  
  connection.query(
    'SELECT SN, name FROM device',
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(results);
    }

  });
});


router.get('/data/:device', function(req, res) {

  let devid = req.params.device;

  connection.query(
    'SELECT s.* FROM ( SELECT TOE1, TOE2, TTE1, TTE2, HOV, HTV, HT, time FROM measurement WHERE device = ? ORDER BY time DESC LIMIT 0,250 ) s ORDER BY s.time ASC', [devid],
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(JSON.stringify(results));
    }

  });

});


router.get('/usage/:device', function(req, res) {

  let devid = req.params.device;

  connection.query(
    'SELECT HOV, HTV, HT FROM measurement WHERE device = ? ORDER BY time DESC LIMIT 0,1', [devid],
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(JSON.stringify(results));
    }

  });

});


router.get('/name/:device', function(req, res) {

  let devid = req.params.device;

  connection.query(
    'SELECT name FROM device WHERE SN = ?', [devid],
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(JSON.stringify(results));
    }

  });

});

/* GET api listing. */
router.get('/', function(req, res) {
  res.status(200);
  res.send("{\"success\":\"true\"}");
});



module.exports = router;
