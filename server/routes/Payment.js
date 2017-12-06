var express = require('express');
var router = express.Router();
var Auth = require('../models/Auth');
var Payment = require('../models/Payment');
var Response2JSON = require('../Response2JSON');
var stripe = require('stripe')('sk_test_R2b21EnvL5TS0vI4bhkft3Kc');
var api_key = '9bd5a36508c2e1745acb2ceda31ba1cc';  // secret paymill API key 
var paymill = require('paymill-node')(api_key);

router.post('/client', function(req, res, next) {
    var email = req.body.email;
    paymill.clients.create({
        email: email
    },function(err, client) {
        if (err) return res.status(500).json(err);
        res.status(201).json(client);
        }
    );
});

router.post('/debit', function(req, res, next) {
    var bic = req.body.bic,
        accountNumber = req.body.account_number,
        holder = req.body.holder,
        clientToken = req.body.client_token;

    paymill.clients.details(clientToken, function(err, client) {
        console.log(client);
        if(err) return res.status(500).json(err);
        paymill.payments.create({
            type: "debit",
            client: client,
            holder: holder,
            account: accountNumber,
            code: bic
        }, function(err, payment) {
            if(err) return res.status(500).json(err);
            res.status(200).json(payment);   
        })
    });

    
});

module.exports = router;


