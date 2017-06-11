var express = require('express');
var mongoose = require('mongoose');

var app = express();

//app.use(express.logger());
app.use(express.static('bower_components'));
app.use(express.static('node_modules'));
app.use(express.static('public'));

app.use(require('body-parser')());

//connect to local mongodb database
var db = mongoose.connect('mongodb://127.0.0.1:27017/stock-app');

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});

//use ejs to serve files
app.set('view engine', 'ejs');

//routes and login handler
require('./routes/routes')(app);

var http = require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection', function(socket){
	console.log('user is connected');

	socket.on('Stocks Changed', function(msg){
		console.log('Stocks Changed');
		io.emit('Stocks Changed', msg);
	})

	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
})

http.listen(8080, function(){
  console.log("Express server listening on port 8080")
});