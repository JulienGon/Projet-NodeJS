
var users = require('../lib/users');

exports.getIndex = function(req, res) {

	var userId;

	if (req.session.userId) {
		userId = req.session.userId;
	}
	else {
		userId = req.session.userId = users.addUser();
	}

	//render la page views / home / index .html
	res.render('home/index', { 
		userId: userId
	});
};


exports.postTag = function(req, res) {
console.log("l'export postTag marche !")
console.log("req.body.tag" + req.body.tag)
	users.addTag(req.session.userId, req.body.tag);

	//redirige vers la home page
	res.redirect('/');
};