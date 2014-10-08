(function() {

	var socket = io();
	socket.emit('auth', userId);

	var ulTweets = document.getElementById('tweets');

	// socket.on('tweet', function(tweet) {
	// 	var firstLi = ulTweets.firstChild;

	// 	var li = document.createElement('li');
	// 	li.innerHTML = tweet.text;

	// 	if (!firstLi) {
	// 		ulTweets.appendChild(li);
	// 	}
	// 	else {
	// 		ulTweets.insertBefore(li, firstLi);
	// 	}
	// });


	socket.on('StatUpdate', function(calcul, tag) {
		console.log('calcul' + calcul);
		console.log('tag' + tag);
		$('.Ticket').empty();
		$('.Ticket').append('<h1>' + tag + '</h1> <h2>' + calcul + '</h2>')
	});

})();
