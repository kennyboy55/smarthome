
var connection = require('../db');

const express = require('express');
const router = express.Router();


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
        console.log(results);

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




module.exports = router;
