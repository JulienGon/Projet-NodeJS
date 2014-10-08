var users = require('./users');

module.exports = function(io) {

	//Connection d'un nouvel utilisateur, le parametre
	//socket represente la connection de CET utilisateur.
	io.sockets.on('connection', function(socket) {

		socket.on('auth', function(userId) {
			console.log('User auth:' + userId);
			users.setSocket(userId, socket);
		});
	});
};