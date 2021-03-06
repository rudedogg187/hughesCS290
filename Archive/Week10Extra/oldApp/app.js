var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

var pool = mysql.createPool({
	host  : 'localhost',
	user  : 'student',
	password: 'default',
	database: 'student'
});

//reset table
app.get('/reset-table', function(req, res, next) {
	var context = {};
	pool.query("DROP TABLE IF EXISTS workouts", function(err) { //replace with  your connection pool 
		var createString = "CREATE TABLE workouts(" +
		"id INT PRIMARY KEY AUTO_INCREMENT," +
		"name VARCHAR(255) NOT NULL," +
		"reps INT," +
		"weight INT," +
		"date DATE," +
		"lbs BOOLEAN)";
		pool.query(createString, function(err) {
			context.page = 'RESET TABLE';
			context.results = "Table reset";
//			res.render('home', context);
		})
	});
});


//inserting data
app.get('/insert',function(req,res,next){
	var context = {};

	pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
	[
		req.query.name, 
		req.query.reps, 
		req.query.weight, 
		req.query.date, 
		req.query.lbs
	], function(err, result) {

		if(err){
			next(err);
			return;
		}


		pool.query('SELECT * FROM workouts', function(err, rows, fields) {
			if(err) {
				next(err);
				return;
			}
			context.page = 'NEW SELECTING DATA';
			context.results = JSON.stringify(rows);
			//res.render('home', context);
			res.send(context.results);
		});



	
//	context.page = 'INSERTING DATA';	
//	context.results = "Inserted id " + result.insertId;
//	res.render('home', context);

	});
});





/*
//inserting data
app.get('/insert',function(req,res,next){
	var context = {};

	pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result) {
	
		if(err){
			next(err);
			return;
		}
	
	context.page = 'INSERTING DATA';	
	context.results = "Inserted id " + result.insertId;
	res.render('home', context);
	});
});
*/

//selecting data
app.get('/', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM workouts', function(err, rows, fields) {

		if(err) {
			next(err);
			return;
		}

		context.page = 'SELECTING DATA';
		context.results = JSON.stringify(rows);
//		res.render('home', context);
	});
});

//updating data
app.get('/update',function(req, res, next) {
	var context = {};
	pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){

		if(err){
			next(err);
			return;
		}

		if(result.length == 1){
			var curVals = result[0];

			pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ", 
			[
				req.query.name   || curVals.name, 
				req.query.reps   || curVals.reps, 
				req.query.weight || curVals.weight, 
				req.query.date   || curVals.date, 
				req.query.lbs    || curVals.lbs, 
				req.query.id
			], function(err, result) {

				if(err){
					next(err);
					return;
				}
				
				context.page = 'UPDATING DATA';
				context.results = "Updated " + result.changedRows + " rows.";
			//	res.render('home', context);
			});
		}
	});
});







//deleting data
app.get('/delete', function(req,res,next) {
	var context = {};
	pool.query("DELETE FROM workouts WHERE id=? ", [req.query.id], function(err, result) {

    if(err) {
      next(err);
      return;
    }

	context.page = 'DELETING DATA';
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home', context);

  });
});

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
	console.log('Port 3000');
});
