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
