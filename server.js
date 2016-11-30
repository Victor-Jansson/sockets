var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var _ = require('lodash');

app.use('/client', express.static('client'));
app.use('/admin', express.static('admin'));
app.use('/inject', express.static('inject'));

connections = [];
clients = [];

server.listen(3000);
console.log('Server running');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/admin', function (req, res) {
	res.sendFile(__dirname + '/admin/index.html');
});

io.on('connection', function (socket) {		
	console.log('connection started');
	connections.push(socket);
	
	io.emit('users changed', clients);

	socket.on('disconnect', function () {
		connections.splice(connections.indexOf(socket), 1);
		clients.splice(clients.indexOf(socket.client.id), 1);

		io.emit('users changed', clients);
	});

	socket.on('register client', function() {
		console.log('register client', socket.client.id);
		clients.push(socket.client.id);

		io.emit('users changed', clients);
	})

	socket.on('user info', function(id) {
		let connection = _.find(connections, function(connection) {
			return connection.client.id === id;
		});

		connection.emit('personal msg', 'hello');
	});
});
