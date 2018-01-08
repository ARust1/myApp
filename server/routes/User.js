var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Payment = require('../models/Payment');
var stripe = require('stripe')('sk_test_R2b21EnvL5TS0vI4bhkft3Kc');
var Response2JSON = require('../Response2JSON');

router.get('/:id?',function(req, res, next) {
  if(req.params.id){
    User.getUserById(req.params.id,function(err,rows){
      var json = Response2JSON.JSONFY(rows);
      if(err) return res.json(err);
      res.json(json[0]);

    });
  } else {
    if(req.query.token) {
      User.getUserByToken(req.query.token, function (err, rows) {
        var json = Response2JSON.JSONFY(rows);
        var userProfileObj = {
          uuid: json[0].uuid,
          email : json[0].email,
          prename: json[0].prename,
          surname: json[0].surname,
          admin: json[0].admin,
          accountToken: json[0].accountToken,
          team_id: json[0].team_id,
          back_number: json[0].back_number,
          position: json[0].position,
          birthday: json[0].birthday,
          profile: {
            profile_img: json[0].profile_img,
            file_id: json[0].file_id
          }
        };
        if (err) return res.json(err);
        res.json(userProfileObj);
      });
    } else if(req.query.team_id) {
      User.getUserByTeamId(req.query.team_id, function (err, rows) {
        var json = Response2JSON.JSONFY(rows);
        if (err) return res.json(err);
        res.json(json);
      });
    } else {
      User.getAllUser(function(err,rows){
        var json = Response2JSON.JSONFY(rows);
        if(err) return res.json(err);
        res.json(json);
      });
    }
  }
});

router.put('/:id/identityCard', function(req, res) {
  User.saveFileId(req.params.id, req.body.file_id, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

router.put('/:id/profileImg', function(req, res) {
  User.saveImgUrl(req.params.id, req.body.profile_img, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

router.put('/:id',function(req,res,next){
  console.log(req.body);
  User.updateUser(req.params.id,req.body,function(err, rows){
    if(err) return res.json(err);
    res.json(rows);
  });
});



router.get('/customerToken/:id', function (req, res, next) {

  Payment.getCustomerToken(req.params.id, function(err, result) {
    var json = Response2JSON.JSONFY(result);
    if (err) return res.json(err);
    res.json(json[0].customerToken);
  })
});

router.post('/bankAccount', function(req, res, next) {
  var body = req.body;
  var country = body.country,
    currency = body.currency,
    account_holder_name = body.account_holder_name,
    account_holder_type = body.account_holder_type,
    routing_number = body.routing_number,
    account_number = body.account_number;

  var customerToken = req.body.customerToken;
  stripe.tokens.create({
    bank_account: {
      country: country,
      currency: currency,
      account_holder_name: account_holder_name,
      account_holder_type: account_holder_type,
      routing_number: routing_number,
      account_number: account_number
    }
  }, function(err, token) {
    if(err) return res.status(500).json(err);
    stripe.customers.createSource(
      customerToken,
      { source: token.id },
      function(err, card) {
        if(err) return res.status(200).json(err);
        res.status(200).json(card);
      }
    );
  });

});

router.post("/bankAccount/verify", function (req, res, next) {
  var customerToken = req.body.customer_token;
  var bankToken = req.body.bank_token;
  var data = {amounts: [32,45]};
  stripe.customers.verifySource(
    customerToken,
    bankToken,
    {
      amounts: [32, 45]
    },
    function(err, bankAccount) {
      if(err) return res.status(200).json(err);
      res.status(200).json(bankAccount);
    });
});

router.get('/customer/:token', function(req, res, next) {
  var customerToken = req.params.token;

  stripe.customers.retrieve(
    customerToken,
    function(err, customer) {
      if(err) return res.status(200).json(err);
      res.status(200).json(customer);
    }
  );
});

router.put('/customer/:token', function(req, res, next) {
  var customerToken = req.params.token;
  var account_balance = req.body.account_balance;

  stripe.customers.update(customerToken, {
    account_balance: account_balance
  }, function(err, customer) {
    if(err) return res.status(200).json(err);
    res.status(200).json(customer);
  });
});

router.post('/customer/debit', function(req, res, next) {
  var body = req.body;
  var iban = body.iban,
    currency = body.currency,
    name = body.name;

  stripe.sources.create({
    type: "sepa_debit",
    sepa_debit: {iban: iban},
    currency: currency,
    owner: {
      name: name
    }
  }, function(err, source) {
    if(err) return res.status(500).json(err);
    res.status(200).json(source);
  });
});

router.post('/customer/card', function(req, res, next) {
  var body = req.body;
  var customerToken = body.customer_token;
  var number = body.number,
    expMonth = body.exp_month,
    expYear = body.exp_year,
    cvc = body.cvc;

  stripe.tokens.create({
    card: {
      "number": number,
      "exp_month": expMonth,
      "exp_year": expYear,
      "cvc": cvc
    }
  }, function(err, token) {
    if(err) return res.status(500).json(err);
    stripe.customers.createSource(
      customerToken,
      { source: token.id },
      function(err, card) {
        if(err) return res.status(500).json(err);
        res.status(200).json(card);
      }
    );
  });
});

router.post('/charge', function(req, res, next) {
  var customerToken = req.body.customer_token;
  var amount = req.body.amount;

  stripe.charges.create({
    amount: amount,
    currency: "usd",
    customer: customerToken
  }, function(err , charge) {
    if(err) return res.status(500).json(err);
    res.status(200).json(charge);
  });
});

router.post('/bankAccount/payout', function(req, res, next) {
  var destination = req.body.destination;
  var amount = req.body.amount;
  var currency = req.body.currency;
  stripe.payouts.create({
    amount: amount,
    currency: currency
  }, function(err, payout) {
    if(err) return res.status(500).json(err);
    res.status(200).json(payout);
  });
});

router.post('/gocardless/customer', function(req, res, next) {

});

module.exports = router;
