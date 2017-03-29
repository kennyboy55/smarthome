var connection = require('../db');

const express = require('express');
const router = express.Router();


var parseTelegram = function(data, callback){

  var toe1 = 0; //Totaal opgenomen energie (tarief 1)
  var toe2 = 0; //Totaal opgenomen energie (tarief 2)
  var tte1 = 0; //Totaal teruggeleverde energie (tarief 1)
  var tte2 = 0; //Totaal teruggeleverde energie (tarief 2)
  var ht = 0;   //Huidig tarief
  var hov = 0;  //Huidig opgenomen vermogen
  var htv = 0;  //Huidig teruggeleverd vermogen

  var regx = /./g;
  var found = "";

  var str = data;


  //TOE1
  regx = new RegExp("^([a-z0-9]{*,})$");
  if (regx.test(str)){
    console.log("Yes binnen");
  }else {
    console.log("No!!!!")
  }
  found = str.match(regx);

  console.log("\n\nPARSING\n");
  console.log(str);
  console.log(found);

  if(found.length > 0)
    toe1 = found[0];


  //TOE2
  regx = /1-0:1\.8\.2\((\d{6}\.\d{3})\*kWh\)/g;
  found = str.match(regx);

  if(found.length > 0)
    toe2 = found[0];


  //TTE1
  regx = /1-0:2\.8\.1\((\d{6}\.\d{3})\*kWh\)/g;
  found = str.match(regx);

  if(found.length > 0)
    tte1 = found[0];


  //TTE2
  regx = /1-0:2\.8\.2\((\d{6}\.\d{3})\*kWh\)/g;
  found = str.match(regx);

  if(found.length > 0)
    tte2 = found[0];


  //HT
  regx = /0-0:96\.14\.0\((\d{4})\)/g;
  found = str.match(regx);

  if(found.length > 0)
    ht = found[0];


  //HOV
  regx = /1-0:1\.7\.0\((\d{2}\.\d{3})\*kW\)/g;
  found = str.match(regx);

  if(found.length > 0)
    hov = found[0];


   //HTV
  regx = /1-0:2\.7\.0\((\d{2}\.\d{3})\*kW\)/g;
  found = str.match(regx);

  if(found.length > 0)
    htv = found[0];



  connection.query(
      'INSERT INTO measurement (TOE1, TOE2, TTE1, TTE2, HT, HOV, HTV, time) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())', [toe1, toe2, tte1, tte2, ht, hov, htv],
                       function (error, results, fields) {
     if (error) throw error;

      callback();
    });

}


router.post('/telegram', function(req, res){
	console.log("Telegram received: ");
	console.log(req.body);

	connection.query(
    'INSERT INTO telegram (time, data) VALUES (NOW(), ?)', [req.body.datagram],
                     function (error, results, fields) {
	 if (error) throw error;

	});

  parseTelegram(req.body.datagram, function(){
    res.status(200);
    res.send("{\"success\":\"true\"}");
  })

});

/* GET api listing. */
router.get('/', function(req, res) {
  res.status(200);
  res.send("{\"success\":\"true\"}");
});



module.exports = router;
