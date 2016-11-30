var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('client'));

connections = [];

server.listen(3000);
console.log('Server running');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function (socket) {		
	console.log('connection started');
	connections.push(socket);

	socket.on('disconnect', function () {
		connections.splice(connections.indexOf(socket), 1);
	});

  socket.emit('msg', connections.length);
});
