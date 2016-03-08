var express = require('express');
var routes = require('./routes');

var app = express();

app.get('/', routes.home);
app.get('/params', routes.params);
app.get('*', routes.bad);



var server = app.listen(3000, function() {
	console.log('Port 3000');
});