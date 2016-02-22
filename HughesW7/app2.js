var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//HOME PAGE @ ROOT
app.get('/', function(request, response) {
	response.render('home.handlebars');
});

//GET LOOPBACK
app.get('/get-loopback', function(request, response) {
	var qParams = getParams(request.query);
	console.log('GET QUERY: ' + qParams);
	var context = {};
	context.dataLst = qParams;
	response.render('get-loopback.handlebars', context);
});

//POST LOOPBACK
app.post('/post-loopback', function(request, response) {
	/*var bParams = [];
	console.log('request.query');
	console.log(request.query);
	for (var p in request.body) {
		bParams.push({'name':p, 'value':request.body[p]});
	}*/
	qParams = getParams(request.query);
	bParams = getParams(request.body);
	console.log('POST QUERY: ' + qParams);
	console.log('POST BODY: ' + bParams);
	var context = {};
	context.dataLst = bParams;
	response.render('post-loopback', context);
});

//GET PARM LIST
function getParams(request) {
	var paramLst = [];
	for (var p in request) {
		paramLst.push({'name':p, 'value':request[p]});
	}
	return paramLst;
}


//ERROR 404
app.use(function(request, response) {
	response.type('text/plain');
	response.status(404);
	response.send('404 - Not Found my Friend');
});

//SYNTAX ERROR
app.use(function(error, request, response, next) {
	console.error(error.stack);
	response.type('plain/text');
	response.status(500);
	response.send('500 - Server Error my Friend');
});

app.listen(app.get('port'), function() {
	console.log('Express started, Ctrl-C to stop');
});
