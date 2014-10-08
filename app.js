var express = require('express');
var routes = require('./routes');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

//Definit des sessions
app.use(session({
	secret: 'ma super key super secrete'
}));

//Configuration du body parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Configuration du public
app.use(express.static(__dirname + '/public'));


//On définit le moteur de template ejs pour les fichiers .html
app.engine('html', require('ejs').__express);
//On dit à express d'utiliser le moteur définit precedement
app.set('view engine', 'html');
app.set('layout', 'layout');
//On lui indique ou se trouve les vues.
app.set('views', __dirname + '/views');

app.use(expressLayouts);

routes(app);

//Express ecoute le port 8080
var server = app.listen(8080);
//Socket io ecoute le port 8080
var io = require('socket.io').listen(server);
require('./lib/socket')(io);

