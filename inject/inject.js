$.getScript('http://localhost:3000/socket.io/socket.io.js', function() {
		var socket = io.connect('http://localhost:3000');
		socket.emit('register client');

		socket.on('personal msg', function(msg) {
			$('h2').text(msg);
		});	
})

