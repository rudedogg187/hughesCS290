var apiKey = '195cce2aa1e91e3fccde548044b6023a'
var request = require('request');

exports.home = function (req, res) {
	var context = {};
	context.pageName = 'HOME';
	res.render('home', context);
}

exports.breweryORG = function (req, res) {
	var context = {};
	context.pageName = 'brewery search';
	res.render('brewery', context);
}

exports.brewery = function (req, res, next) {
	var context = {};
	request('http://api.brewerydb.com/v2/locations?locality=Eugene&region=Oregon&countryIsoCode=US&key=' + apiKey, function(err, response, body){
		if(!err && response.statusCode<400){
			var brewData = JSON.parse(body).data;
			context.pageName = 'brewery';
			context.brewData = brewData;
			context.body = body;
			res.render('brewery', context);
			console.log(brewData);
		}
		else {
			next(err);
		}


	});
	//context.pageName = 'brewery search';
	//res.render('brewery', context);
}

exports.key = function (req, res) {
	var context = {};
	context.pageName = 'KEY';
	res.render('key', context);
}

exports.request = function (req, res) {
	var context = {};
	context.pageName = 'REQUEST';
	res.render('Request', context);
}

exports.reference = function (req, res) {
	var context = {};
	context.pageName = 'REFERENCE';
	res.render('Refernce', context);
}

exports.bad = function (req, res) {
	var context = {};
	context.pageName = 'Bad Route';
	context.script = 
	res.status(404);
	res.render('bad', context);
}

exports.error = function() {
	var context = {};
	context.pageName = 'Error';
	console.error(error.stack);
	response.status(500);
	response.render('error', context);
}

