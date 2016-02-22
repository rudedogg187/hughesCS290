/*****
* Josh Hughes
* FEB 21 2016
* CS290-400
* Get / Post Check
******/

//Code from lecture
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


//GET LOOPBACK
app.get('/', function(request, response) {	//at root of page, run function if request is a GET
	var qParams = getParams(request.query);	//send request query to function to get a param array
	console.log('GET QUERY:');	//log the request type to console
	console.log(qParams);	//log param arry to console
	
	var context = {};	//create empty js object to hold the param array

	context.qDataLst = qParams;	//set attribute in oject to param array
	response.render('get-loopback.handlebars', context);	//use get loopback template, send it the js object (will be aded to a table)
});

//POST LOOPBACK
app.post('/', function(request, response) {	//at root of page, run function if request is a POST
	var qParams = getParams(request.query);	//send request query to function to get a param array
	var bParams = getParams(request.body);	//sent request body to function to get a param array
	console.log('POST QUERY:');	//log request type to console
	console.log(qParams);	//log query array to console
	console.log('POST BODY:');	//log request typt console
	console.log(bParams);	//log body array to console

	var context = {};	//create empty js object

	context.qDataLst = qParams;	//save querya array to js object 
	context.bDataLst = bParams;	//save body array to js object
	
	response.render('post-loopback', context);	//use post loopback template, send the js object  (will be added to a table)
});

//GET PARM LIST
function getParams(request) {	//take in a request type, ccreates an array, returns the array
	var paramLst = [];	//empty array to fill with request
	for (var p in request) {	//loop parameters in the request 
		paramLst.push({"name":p, "value":request[p]});	//push name/value object onto array at each iterataion
	}

	return paramLst;	//return the array
}


//ERROR 404
app.use(function(request, response) {
	response.status(404);
	response.render('nopage.handlebars');
});

//SYNTAX ERROR
app.use(function(error, request, response, next) {
	console.error(error.stack);
	response.status(500);
	response.render('errorpage.handlebars');
});

app.listen(app.get('port'), function() {
	console.log('Express started, Ctrl-C to stop');
});
