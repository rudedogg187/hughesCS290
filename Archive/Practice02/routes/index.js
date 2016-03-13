exports.home = function(req, res) {
	res.send("I'm Still Alive");
}

exports.params = function(req, res) {
	res.send(req.params);
}

exports.bad = function(req, res) {
	res.send('BAD ROUTE');
}