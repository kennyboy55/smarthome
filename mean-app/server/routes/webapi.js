
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



router.get('/data/:device/group/:group/:year1-:month1-:day1/:year2-:month2-:day2', function(req, res) {

  let devid = req.params.device;
  let group = req.params.group;

  let groupdiv = 1;

  switch(group)
  {
    case 'y':
    case 'year':
      groupdiv = 3214080;
      break;
    case 'm':
    case 'month':
      groupdiv = 267840;
      break;
    case 'd':
    case 'day':
      groupdiv = 8640;
      break;
    case 'h':
    case 'hour':
      groupdiv = 360;
      break;
    case 'min':
    case 'minute':
      groupdiv = 6;
      break;
    default:
      break;
  }

  //Date 1
  let day1 = req.params.day1;
  let month1 = req.params.month1;
  let year1 = req.params.year1;

  let date1 = year1 + "-" + month1 + "-" + day1 + " 00:00:00";

  //Date 2
  let day2 = req.params.day2;
  let month2 = req.params.month2;
  let year2 = req.params.year2;

  let date2 = year2 + "-" + month2 + "-" + day2 + " 23:59:59";


  connection.query(
    'SELECT MIN(grp.`time`) as time, AVG(grp.`HOV`) as HOV, AVG(grp.`HTV`) as HTV FROM (SELECT @i:=@i+1 AS `rownum`, FLOOR(@i/?) AS `datagrp`, `time`, `HOV`, `HTV` FROM `measurement` WHERE `device` = ? AND `time` >= ? AND `time` <= ? ORDER BY `time` DESC ) grp GROUP BY `datagrp`', [groupdiv, devid, date1, date2],
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(JSON.stringify(results));
    }

  });

});

router.get('/data/:device/:year1-:month1-:day1/:year2-:month2-:day2', function(req, res) {

  let devid = req.params.device;

  //Date 1
  let day1 = req.params.day1;
  let month1 = req.params.month1;
  let year1 = req.params.year1;

  let date1 = year1 + "-" + month1 + "-" + day1 + " 00:00:00";

  //Date 2
  let day2 = req.params.day2;
  let month2 = req.params.month2;
  let year2 = req.params.year2;

  let date2 = year2 + "-" + month2 + "-" + day2 + " 23:59:59";

  connection.query(
    'SELECT s.* FROM ( SELECT TOE1, TOE2, TTE1, TTE2, HOV, HTV, HT, time FROM measurement WHERE device = ? AND `time` >= ? AND `time` <= ? ORDER BY time DESC ) s ORDER BY s.time ASC', [devid, date1, date2],
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(JSON.stringify(results));
    }

  });

});

router.get('/data/:device/group/:group', function(req, res) {

  let devid = req.params.device;
  let group = req.params.group;

  let groupdiv = 1;

  switch(group)
  {
    case 'y':
    case 'year':
      groupdiv = 3214080;
      break;
    case 'm':
    case 'month':
      groupdiv = 267840;
      break;
    case 'd':
    case 'day':
      groupdiv = 8640;
      break;
    case 'h':
    case 'hour':
      groupdiv = 360;
      break;
    case 'min':
    case 'minute':
      groupdiv = 6;
      break;
    default:
      break;
  }

  connection.query(
    'SET @i:= 0; SELECT MIN(grp.`time`) AS time, AVG(grp.`HOV`) AS HOV, AVG(grp.`HTV`) AS HTV FROM (SELECT @i:=@i+1 AS `rownum`, FLOOR(@i/?) AS `datagrp`, `time`, `HOV`, `HTV` FROM `measurement` WHERE `device` = ? ORDER BY `time` DESC ) grp GROUP BY `datagrp`;', [groupdiv, devid],
                     function (error, results, fields) {
   if (error) throw error;

   if (results.length  > 0) {

        res.status(200);
        res.send(JSON.stringify(results));
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
    'SELECT TOE1, TOE2, TTE1, TTE2, HOV, HTV, HT, tarief1, tarief2 FROM measurement, device WHERE measurement.device = device.SN AND measurement.device = ? ORDER BY time DESC LIMIT 0,1', [devid],
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
