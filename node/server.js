var mysql = require('mysql');
var io = require('socket.io').listen(3000);

var db = mysql.createConnection(
    {
      host     : 'stusql.dcs.shef.ac.uk',
      port     : '3306',
      user     : 'team064',
      password : 'ec4c7a0d',
      database : 'team064'
    }
);

db.connect(function(error){
  if (error) {
    console.log(err)
  }
});

var tweets = [];
var isInitTweets = false;
var socketCount = 0;

io.sockets.on('connection', function(socket){
  socketCount++;
  io.sockets.emit('users connected', socketCount);

  socket.on('disconnect', function(){
    socketCount--;
    io.sockets.emit('users connected', socketCount);
  });

  socket.on('new tweet', function(data){
    tweets.push(data);
    io.socket.emit('new tweet', data);
    db.query('INSERT INTO football (user) VALUES (?)', data.user)
  });

  if (!isInitTweets) {
    db.query('SELECT user FROM football')
    .on('result', function(data){
      tweets.push(data);
    })
    .on('end', function() {
      socket.emit('initial tweets', tweets);
    });
    isInitTweets = true;
  } else {
    socket.emit('inital tweets', tweets);
  }
})
