var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:'secretSquirl'}));


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req, res) {
	var context = {path: 'views/homeview'};
	res.render('homeview.handlebars', context);
});

app.get('/counter', function(req, res) {
	var context = {path: 'views/counter'};
	context.count = req.session.count || 0;
	req.session.count = context.count + 1;
	res.render('counter.handlebars', context);
});

app.post('/counter', function(req, res) {
	var context = {path: 'views/counter'};

	if(req.body.command === 'resetCount') {
		req.session.destroy();
	} else {
		context.err = true;
	}

	if(req.session) {
		context.count = req.session.count;
	} else {
		context.count = 0;
	}
	req.session.count = context.count + 1;
	res.render('counter.handlebars', context);
});

app.get('/looptest', function(req, res) {
	var context = {path: 'views/looptest', looper: [{'name':'name1', 'value':'value1', 'a': 'a1'}, {'name': 'name2', 'value': 'value2', 'a': 'a2'}]};
	res.render('looptest.handlebars', context);
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});


app.listen(app.get('port'), function() {
	console.log(`http://localhost:${app.get('port')}`);
});
