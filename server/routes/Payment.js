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
    debit_negative_balances: true,
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
          res.json({
            card: card,
            btok: token
          });
        }
      );
    }
  });
});


/*
 * Retrive Bank Accounts from a specific Stripe Account
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


/*
 * Add Credit Card to Stripe Account
 ************************************************
 */

router.post('/account/:id/card', function(req, res, next) {
  var body = req.body;
  var number = body.number,
    expMonth = body.exp_month,
    expYear = body.exp_year,
    cvc = body.cvc;
  var accountToken = req.params.id;
  stripe.tokens.create({
    card: {
      "number": number,
      "exp_month": expMonth,
      "exp_year": expYear,
      "cvc": cvc,
      "currency": "USD"
    }
  }, function(err, token) {
    if(err) {
      return res.json(err);
    } else {
      stripe.accounts.createExternalAccount(
        accountToken,
        { external_account: token.id },
        function(err, card) {
          if(err) return res.json(err);
          res.json(token.id);
        });
    }
  });
});


/*
 * Retrieve Credit Cards from a specific Stripe Account
 *********************************************************
 */

router.get('/account/:id/cards', function (req, res, next) {
  var accountToken = req.params.id;
  stripe.accounts.listExternalAccounts(
    accountToken,
    {
      object: "bank_account"
    }, function(err, cards) {
      if(err) return res.json(err);
      res.json(cards);
  });
});


/*
 * Transfer Money to a specific Stripe Account
 ************************************************
 */

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


/*
 * Retrieve all Transfers
 ************************************************
 */

router.get('/:id/transfers', function(req, res, next) {
  var accountToken = req.params.id;
  stripe.transfers.list(
    { destination: accountToken },
    function(err, transfers) {
      if(err) return res.json(err);
      res.json(transfers);
    }
  );
});


/*
 * Retrieve Account Balance
 ************************************************
 */

router.get('/account/:id/balance', function(req, res, next) {
  var accountToken = req.params.id;

  stripe.balance.retrieve({
    stripe_account: accountToken
  }, function(err, balance) {
    if(err) return res.json(err);
    res.json(balance);
  });
});


router.get('/account/:id/transactions', function (req, res, next) {
  var accountToken = req.params.id;

  stripe.balance.listTransactions({

  }, function(err, transactions) {
    if(err) return res.json(err);
    res.json(transactions);
  });
});


router.post('/account/:id/deposit', function (req, res, next) {
  var accountToken = req.params.id;
  var amount = req.body.amount;

  stripe.charges.create({
    amount: Math.ceil(amount * 1.13),
    currency: "eur",
    source: "tok_de",
    destination: {
      amount: amount,
      account: accountToken
    }
  }, function (err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

router.post('/account/:id/charge', function (req, res, next) {
  var accountToken = req.params.id;
  var amount = req.body.amount;
  var destination = req.body.destination;
  var description = req.body.description;

  stripe.charges.create({
    amount: amount,
    currency: "eur",
    description: description,
    source: accountToken
  }, function(err, charge) {
    if(err) {
      return res.json(err);
    } else if(charge) {
      stripe.transfers.create({
        amount: amount,
        currency: "EUR",
        destination: destination
      }, function(err, transfer) {
        if(err) return res.json(err);
        res.json(transfer);
      });
    }


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

router.get('/account/:id/payouts', function(req, res, next) {

  var accountToken = req.params.id;
  stripe.accounts.listExternalAccounts(
    accountToken,
    {
      object: "bank_account"
    }, function(err, account) {
      if(err) {
        return res.json(err);
      } else {
        console.log(account.data);
          stripe.payouts.list(
            { limit: 3 },
            function(err, payouts) {
              if(err) {
                return res.json(err);
              } else {
                res.json(payouts);
              }
            }
          );
      }

    }
  );
});

router.post('/giropay', function(req, res, next) {
  stripe.sources.create({
    type: 'giropay',
    amount: 1099,
    currency: 'eur',
    owner: {
      name: 'Björn Soika'
    },
    redirect: {
      return_url: 'http://192.168.0.73:3000/'
    }
  }, function(err, source) {
    if(err) {
      return res.json(err);
    } else {
      res.json(source)
    }
  });
});

router.post('/giropay/:src/charge', function(req, res, next) {
  var src = req.params.src;

  stripe.charges.create({
    amount: 1099,
    currency: "eur",
    source: src
  }, function(err, charge) {
    if(err) {
      return res.json(err);
    } else {
      res.json(charge)
    }
  });
});


router.post('/sofort', function(req, res, next) {
  stripe.sources.create({
    type: 'sofort',
    amount: 1099,
    currency: 'eur',
    statement_descriptor: 'ORDER AT11990',
    redirect: {
      return_url: 'http://192.168.0.73:3000/'
    },
    sofort: {
      country: 'DE'
    }
  }, function(err, result) {
    if(err) {
      return res.json(err);
    } else {
      res.json(result)
    }
  });
});

router.post('/sofort/:src/charge', function(req, res, next) {
  var  src = req.params.src;
  stripe.charges.create({
    amount: 1099,
    currency: "eur",
    source: src
  }, function(err, charge) {
    if(err) {
      return res.json(err);
    } else {
      res.json(charge)
    }
  });
});


module.exports = router;


