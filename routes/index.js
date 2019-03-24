var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(q, s, x) {
  s.render('index', { title: 'Ecommock' });
});

module.exports = router;
