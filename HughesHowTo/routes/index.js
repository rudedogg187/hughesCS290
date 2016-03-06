exports.home = function (req, res) {
	var context = {};
	context.pageName = 'HOME';
	res.render('home', context);
}

exports.example = function (req, res) {
	var context = {};
	context.pageName = 'EXAMPLE';
	res.render('example', context);
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

