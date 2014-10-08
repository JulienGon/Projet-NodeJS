var ids = 0;

var usersArray = [];

var everyTags = [];

var sthashtags = { 
	// tag : {
	// 	timestamp_ms : [], 
	// 	Calculecart : [],
	// 	nombredetweet : 0,

	// }
};

var users = {
	//Ajoute un utilisateur
	addUser: function() {
		var id = ++ids;
		usersArray[id] = { socket: null, tags: []};

		return id;
	},

	//Assigne un socket à un user
	setSocket: function(userId, socket) {
		usersArray[userId].socket = socket;
	},

	getEveryTags: function () {
		return everyTags;		
	},

	//Ajoute le tag d'une emission à un user
	addTag: function(userId, tag) { console.log("usersArray[userId]" + usersArray[userId].tags)
		usersArray[userId].tags.push(tag.toLowerCase());
		everyTags.push(tag.toLowerCase());
		console.log("usersArray[userId]" + usersArray[userId].tags)
		require('./twitter');1





	},

	//Supprime le tag d'un user0
	deleteTag: function(userId, tag){
    	usersArray.splice(usersArray.indexOf(tag), 1);
},


	CollectData: function(tweet, tag, userId) {
		var timestamp_ms = tweet.timestamp_ms;
		console.log("timestamp marche" + timestamp_ms); 
		console.log('sthashtags : '+sthashtags);
		console.log('tag : '+tag);

		if (sthashtags[tag] == undefined){
			sthashtags = {tag:{}};	
			console.log('pushed '+tag+' in sthashtags');
			sthashtags[tag] = {
				'timestamp_ms' : [],
				'CalculTweetParMinute' : 0,
			 	'nombredetweet' : 0
			};
		}

		
		sthashtags[tag].timestamp_ms.push(timestamp_ms);

		console.log("le push timestamp marche" + sthashtags[tag].timestamp_ms)

		sthashtags[tag].nombredetweet++; 

		var calcul = (sthashtags[tag].timestamp_ms[sthashtags[tag].timestamp_ms.length -1] - sthashtags[tag].timestamp_ms[0]) / sthashtags[tag].nombredetweet;

		sthashtags[tag].CalculTweetParMinute = calcul;

		console.log('CalculTweetParMinute' + sthashtags[tag].CalculTweetParMinute );
		console.log('CalculTweetParMinute' + calcul );
		console.log('calcul = ' + sthashtags[tag].timestamp_ms[sthashtags[tag].timestamp_ms.length-1] + '-' + sthashtags[tag].timestamp_ms[0] + '/' +  sthashtags[tag].nombredetweet);
		
		

		userId.socket.emit('StatUpdate', calcul, tag);




		console.log("CollectData marche !")
	},


	//Transmettre les tweets au users selon leur tag
	broadcast: function(tweet) {
		var tag, client;
		
		//pour chaque user, comparer les hashtags du tweet avec 
		//les hashtags de l'user.
		for (var i = 0; i < usersArray.length; i++) {
			client = usersArray[i];
			if (!client) {
				continue;
			}

			for (var j = 0; j < tweet.entities.hashtags.length; j++) {
				tag = tweet.entities.hashtags[j].text;

				//Si ca correspond, envoyer/emit le tweet à l'user via websocket.
				if (client.tags.indexOf(tag.toLowerCase()) !== -1) {
					client.socket.emit('tweet', tweet);
					console.log("rempli")
					var userId = usersArray[i];
					users.CollectData(tweet, tag, userId);
					break;
				}
			} //end for hashtags
		} //end for userArray

	},

	
	



}

module.exports = users;