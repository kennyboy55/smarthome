var connection = require('../db');

const express = require('express');
const router = express.Router();

router.all('*', function(req, res){
  console.log(req.path);
  req.next();
});

var parseTelegram = function(data, callback){

  var toe1 = 0; //Totaal opgenomen energie (tarief 1)
  var toe2 = 0; //Totaal opgenomen energie (tarief 2)
  var tte1 = 0; //Totaal teruggeleverde energie (tarief 1)
  var tte2 = 0; //Totaal teruggeleverde energie (tarief 2)
  var ht = 0;   //Huidig tarief
  var hov = 0;  //Huidig opgenomen vermogen
  var htv = 0;  //Huidig teruggeleverd vermogen
  var device = 0; //Device id

  var regx = /./g;
  var found = "";

  var str = data;

  //METER ID
  regx = /0-0:96\.1\.1\((\w+)\)/g;
  found = regx.exec((str));
  if(found)
    device = found[1];

  //TOE1
  regx = /1-0:1\.8\.1\((\d{5,6}\.\d{3})\*kWh\)/g;
  found = regx.exec(str);

  if(found)
    toe1 = found[1];

  //TOE2
  regx = /1-0:1\.8\.2\((\d{5,6}\.\d{3})\*kWh\)/g;
  found = regx.exec(str);

  if(found)
    toe2 = found[1];


  //TTE1
  regx = /1-0:2\.8\.1\((\d{5,6}\.\d{3})\*kWh\)/g;
  found = regx.exec(str);

  if(found)
    tte1 = found[1];


  //TTE2
  regx = /1-0:2\.8\.2\((\d{5,6}\.\d{3})\*kWh\)/g;
  found = regx.exec(str);

  if(found)
    tte2 = found[1];


  //HT
  regx = /0-0:96\.14\.0\((\d{2,4})\)/g;
  found = regx.exec(str);

  if(found)
    ht = found[1];


  //HOV
  regx = /1-0:1\.7\.0\((\d{2,4}\.\d{2,3})\*kW\)/g;
  found = regx.exec(str);

  if(found)
    hov = found[1];


   //HTV
  regx = /1-0:2\.7\.0\((\d{2,4}\.\d{2,3})\*kW\)/g;
  found = regx.exec(str);

  if(found)
    htv = found[1];


  connection.query(
      'INSERT INTO `measurement` (`device`, `TOE1`, `TOE2`, `TTE1`, `TTE2`, `HT`, `HOV`, `HTV`, `time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())', [device, toe1, toe2, tte1, tte2, ht, hov, htv],
                       function (error, results, fields) {
     if (error) throw error;


      connection.query(
          'INSERT INTO `device` (`SN`, `name`, `API`) VALUES (?, "New device", 42)', [device],
                           function (error, results, fields) {

          callback();
        });
    });


  

}


router.post('/telegram', function(req, res){

	connection.query(
    'INSERT INTO `telegram` (`time`, `data`) VALUES (NOW(), ?)', [req.body.datagram],
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
