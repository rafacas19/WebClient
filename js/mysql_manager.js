var mysql = require('mysql');

var connection = mysql.createConnection(
    {
      host     : 'stusql.dcs.shef.ac.uk',
      port     : '3306',
      user     : 'team064',
      password : 'ec4c7a0d',
      database : 'team064assignment'
    }
);

connection.connect();
var query = connection.query('SELECT * FROM device');

query.on('error', function(err) {
    throw err;
});

query.on('fields', function(fields) {
    console.log(fields);
});

query.on('result', function(row) {
    console.log(row);
});
connection.end();
