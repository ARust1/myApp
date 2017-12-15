var express = require('express');
var router = express.Router();
var Auth = require('../models/Auth');
var Payment = require('../models/Payment');
var Response2JSON = require('../Response2JSON');
var moment = require('moment');
var stripe = require('stripe')('sk_test_tuvyZ0uIGcY61cYKLLsqkrUu');

/*
 * Create, Update & Delete Stripe Account
 ************************************************
 */


router.post('/createAccount', function(req, res, next) {
  stripe.accounts.create({
    country: "DE",
    type: "custom"
  }).then(function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

router.put('/account/:id', function(req, res, next) {

  var body = req.body;
  var firstName = body.first_name;
  var lastName = body.last_name;
  var day = body.day;
  var month = body.month;
  var year = body.year;
  var city = body.city;
  var country = body.country_code;
  var line1 = body.line;
  var postalCode = body.postal_code;
  var state = body.state;

  var data = {
    legal_entity: {
      first_name: firstName,
      last_name: lastName,
      type: "individual",
      dob: {
        day : day,
        month: month,
        year: year
      },
      address: {
        city: city,
        country: country,
        line1: line1,
        postal_code: postalCode,
        state: state
      }
    },
    tos_acceptance: {
      date: moment(new Date()).unix(),
      ip: req.connection.remoteAddress
    },
    payout_schedule: {
      interval: "manual"
    }
  };

  stripe.accounts.update(req.params.id, data).then(function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

router.delete('/account/:id', function(req, res, next) {
  stripe.accounts.del(req.params.id)
    .then(function(err, result) {
      if(err) return res.json(err);
      res.json(result);
  });
});

/*
 * Add Bank Account to Stripe Account
 ************************************************
 */

router.post('/account/bankAccount', function(req, res, next) {
  var body = req.body;
  var country = body.country,
    currency = body.currency,
    account_holder_name = body.account_holder_name,
    account_holder_type = body.account_holder_type,
    account_number = body.account_number;

  var accountToken = req.body.account_token;
  stripe.tokens.create({
    bank_account: {
      country: country,
      currency: currency,
      account_holder_name: account_holder_name,
      account_holder_type: account_holder_type,
      account_number: account_number
    }
  }, function(err, token) {
    if (err) {
      return res.status(500).json(err);
    } else {
      stripe.accounts.createExternalAccount(
        accountToken,
        { external_account: token.id },
        function(err, card) {
          if(err) return res.json(err);
          res.json(card);
        }
      );
    }
  });
});

/*
 * Retrive Bank Account from Stripe Account
 ************************************************
 */

router.get('/account/:id', function (req, res, next) {
  var accountToken = req.params.id;
  stripe.accounts.retrieve(
    accountToken,
    function(err, account) {
      if(err) return res.json(err);
      res.json(account);
    }
  );
});

router.post('/transfer', function(req, res, next) {
  var destination = req.body.destination;
  var amount = req.body.amount;

  stripe.transfers.create({
    amount: amount,
    currency: "EUR",
    destination: destination
  }, function(err, transfer) {
    if(err) return res.json(err);
    res.json(transfer);
  });
});

router.get('/transfers', function(req, res, next) {
  stripe.transfers.list(
    { limit: 3 },
    function(err, transfers) {
      if(err) return res.json(err);
      res.json(transfers);
    }
  );
});

router.get('/account/:id/balance', function(req, res, next) {
  var accountToken = req.params.id;

  stripe.balance.retrieve({
    stripe_account: accountToken
  }, function(err, balance) {
    if(err) return res.json(err);
    res.json(balance);
  });
});

router.post('/account/:id/charge', function (req, res, next) {
  var accountToken = req.params.id;
  var amount = req.body.amount;

  stripe.charges.create({
    amount: amount,
    currency: "EUR",
    source: accountToken
  }, function (err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

router.post('/account/:id/payout', function (req, res, next) {
  var accountToken = req.params.id;
  var amount = req.body.amount;

  stripe.payouts.create({
    amount: amount,
    currency: "EUR"
  }, {
    stripe_account: accountToken
  }, function (err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

module.exports = router;


