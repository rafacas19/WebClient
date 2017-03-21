var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'BhBDTS4urGoSYW2x3TD9xk939',
  consumer_secret: 'DmYGQRS3gjx7cIMZa54dobSWV1ShQgTpTnXVNE3RWFQpn0rqXj',
  access_token_key: '844220358416879618-A13Z7i481T2DcuSvCVFaVMgL3QHEkXe',
  access_token_secret: 'PN8f3atQ1vXoBuCojT9t8XcDC0tjlbbtMaw6bDGfNgvKw'
});

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

// twitter.getSearch({'q':'#ManCity','count': 10}, error, success);

var params = {q: '#MCFC'};
client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.statuses.length; i++) {
      var statuses = tweets.statuses[i];
      console.log(statuses);
      console.log("");
  }

  }
});
