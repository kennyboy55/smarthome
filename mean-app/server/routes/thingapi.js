var connection = require('../db');

const express = require('express');
const router = express.Router();



router.post('/telegram', function(req, res){
	console.log("Telegram received: ");
	console.log(req.body);

	connection.query(
    'INSERT INTO telegram (time, data) VALUES (NOW(), ?)', [req.body.datagram],
                     function (error, results, fields) {
	 if (error) throw error;

	});

  res.status(200);
  res.send("{\"success\":\"true\"}");
});

/* GET api listing. */
router.get('/', function(req, res) {
  res.status(200);
  res.send("{\"success\":\"true\"}");
});




module.exports = router;
