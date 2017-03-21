var mysql = require('mysql');
var Twitter = require('twitter');

var connection = mysql.createConnection(
    {
      host     : 'stusql.dcs.shef.ac.uk',
      port     : '3306',
      user     : 'team064',
      password : 'ec4c7a0d',
      database : 'team064'
    }
);

var client = new Twitter({
  consumer_key: 'BhBDTS4urGoSYW2x3TD9xk939',
  consumer_secret: 'DmYGQRS3gjx7cIMZa54dobSWV1ShQgTpTnXVNE3RWFQpn0rqXj',
  access_token_key: '844220358416879618-A13Z7i481T2DcuSvCVFaVMgL3QHEkXe',
  access_token_secret: 'PN8f3atQ1vXoBuCojT9t8XcDC0tjlbbtMaw6bDGfNgvKw'
});

connection.connect();

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

// twitter.getSearch({'q':'#ManCity','count': 10}, error, success);
var values = new Array();
var params = {q: '#YNWA'};
client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.statuses.length; i++) {
      var statuses = tweets.statuses[i];

      var id = statuses.id;
      var user = statuses.user.screen_name;
      var time = statuses.created_at;
      var text = statuses.text;
      var retweets = statuses.retweet_count;
      var favorites = statuses.favorite_count;
      // console.log(id);
      // values.push([id,user,time,retweets,favorites]);
      var query = connection.query('INSERT INTO football' +
      '(tweet_id,user,date,text,favorites,retweets) ' +
      'VALUES(?,?,?,?,?,?)',
                    [id.toString(), user, time, text, retweets, favorites],
                    function(error, result, fields) {
                      if (error) {
                        throw error;
                        connection.end();
                      }
                      // if (result) {
                      //   connection.end()
                      // }
                    });
    }
  }
  connection.end();
});





// console.log(values);

// var query = connection.query('SELECT name FROM football');

// var query = connection.query('INSERT INTO football VALUES(?,?,?,?,?)',
//                 [id, user, time, retweets, favorites]);
