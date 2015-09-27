var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var logout = require('express-passport-logout');
var User = require('../models/userSchema');

mongoose.connect('mongodb://localhost/stock-dash');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {user: req.user});
});

module.exports = router;
