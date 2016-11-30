define('app', [
		'node_modules/knockout/build/output/knockout-latest',
		'node_modules/socket.io-client/dist/socket.io.js',
		'node_modules/lodash/lodash.js'
	], function(ko, io, _) {
		var socket = io.connect('http://localhost:3000');

		socket.on('users changed', function(clients) {
			model.users([]);

			_.forEach(clients, function(client) {
				model.users.push(client);
			});

		})

		var model = {
			users: ko.observableArray([])
		}

		userClick = function(id) {
			socket.emit('user info', id);
		}

	ko.applyBindings(model);
});

