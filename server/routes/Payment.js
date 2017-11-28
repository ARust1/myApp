var express = require('express');
var router = express.Router();
var Auth = require('../models/Auth');
var Payment = require('../models/Payment');
var Response2JSON = require('../Response2JSON');
var stripe = require('stripe')('sk_test_R2b21EnvL5TS0vI4bhkft3Kc');



module.exports = router;


