var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'asdf1239',
  database : 'smarthome'
});



const express = require('express');
const router = express.Router();

router.post('/telegram', function(req, res){
	console.log("Telegram received: ");
	console.log(req.body);

	/*connection.connect();

	//connection.query(
	//                  'INSTERT INTO telegram (`time`,`data`) VALUES (\'NOW()\', \'' + req.body + '\')',
  //                                                                function (error, results, fields) {
	 // if (error) throw error;

	//});
	connection.end();*/

  res.status(200);
  res.send("{\"success\":\"true\"}");
});

/* GET api listing. */
router.get('/', function(req, res) {
  res.send('api works');
});

module.exports = router;
