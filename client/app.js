define('app', ['node_modules/socket.io-client/dist/socket.io.js'], 
	function (io) {
		console.log('app.js');
		var socket = io.connect('http://localhost:3000');

		socket.on('msg', function(msg) {
			let elm = document.getElementById('user-name');
			elm.textContent = msg;
		});

	}
);
