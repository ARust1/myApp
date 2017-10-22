var mysql = require('mysql');
var connection = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '',
  database: 'wallet_db'
});

module.exports = connection;
