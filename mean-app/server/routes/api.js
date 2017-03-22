var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'asdf1239',
  database : 'smarthome'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();

const express = require('express');
const router = express.Router();

router.post('/telegram', (req, res) =>
{
  console.log(req.body);

  res.status(200);
  res.send("{\"success\":\"true\"}");
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
