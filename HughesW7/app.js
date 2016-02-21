var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(request, response) {
	response.render('home.handlebars');
});

app.get('/test', function(request, response) {
	response.render('test.handlebars');
});

function getContext() {
	var toDisplay = {};
	toDisplay.first = "Keagan";
	toDisplay.last = "Hughes";
	toDisplay.middle = "Dale";
	return toDisplay;
}

app.get('/name', function(request, response) {
	response.render('name.handlebars', getContext());
});

app.get('/get-loopback', function(request, response) {
	var qParams = [];
	console.log("request.query:");
	console.log(request.query);
	for (var p in request.query) {
		qParams.push({'name':p, 'value':request.query[p]});
	}
	console.log('GET:');
	console.log(qParams);
	var context = {};
	context.dataLst = qParams;
	response.render('get-loopback.handlebars', context);
});

app.post('/post-loopback', function(request, response) {
	var qParams = [];
	console.log('request.query');
	console.log(request.query);
	for (var p in request.body) {
		qParams.push({'name':p, 'value':request.body[p]});
	}
	console.log('POST:');
	console.log(qParams);
	console.log(request.body);
	var context = {};
	context.dataLst = qParams;
	response.render('post-loopback', context);
});


/*
app.get('/get-loopback', function(request, response) {
	var qParams = "";
	for (var p in request.query) {
		qParams += "Key: " + p + " | Value: " + request.query[p] +'\n'; 
	}
	console.log(qParams);
});

app.get('/show-data', function(request, response) {
	var context = {};
	context.dataSent = request.query.myData;
	context.dataSent2 = request.query.myData2;
	console.log(request.query);
	response.render('show-data.handlebars', context);
});
*/





app.use(function(request, response) {
	response.type('text/plain');
	response.status(404);
	response.send('404 - Not Found my Friend');
});

app.use(function(error, request, response, next) {
	console.error(error.stack);
	response.type('plain/text');
	response.status(500);
	response.send('500 - Server Error my Friend');
});

app.listen(app.get('port'), function() {
	console.log('Express started, Ctrl-C to stop');
});
