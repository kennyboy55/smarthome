var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'asdf1239',
  database : 'smarthome',
  timezone : 'utc',
  multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;