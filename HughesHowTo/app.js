
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var request = require('request');
var routes = require('./routes');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);
app.set(express.static('public'));



app.get('/', routes.home);
app.get('/brewerySearch', routes.brewery);
app.get('/key', routes.key);
app.get('/request', routes.request);
app.get('/reference', routes.reference);
app.use(routes.bad);




app.listen(app.get('port'), function() {
	console.log(`http://localhost:${app.get('port')}`);
});
