


var configTwitter = require('../config/twitter');
var Twit = require('twit');
var T = new Twit({
    consumer_key:         configTwitter.consumerKey
  , consumer_secret:      configTwitter.consumerSecret
  , access_token:         configTwitter.accessToken
  , access_token_secret:  configTwitter.accessTokenSecret
});

var users = require('./users');
console.log("Everytag=" + users.getEveryTags());
var stream = T.stream('statuses/filter', { track: users.getEveryTags() });
stream.on('tweet', function (tweet) {
	users.broadcast(tweet);
	console.log('tweet arrived');
	console.log(tweet.text);
});


