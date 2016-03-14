var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 3000);
app.use(express.static('public'));

var pool = mysql.createPool({
	host  : 'localhost',
	user  : 'student',
	password: 'default',
	database: 'student'
});


//main page***************************************************************************************
app.post('/', function(req, res, next) {
	var context = {};
	pool.query('SELECT * FROM workouts', function(err, rows, fields) {

		if(err) {
			next(err);
			return;
		}

		context.results = rows //JSON.stringify(rows);
		context.status = 'Status: Database Loaded';
		res.send(context);
	});
});


app.get('/update', function(req, res, next) {
	var context = {}
	var changeId = req.query.id;
	pool.query("SELECT * FROM workouts WHERE id=?", [changeId], function(err, rows, result){

		if(err){
			next(err);
			return;
		}

		var results = rows[0];

		var oldName = results.name;
		var oldReps = results.reps;
		var oldWeight = results.weight;
		var oldDate = results.date;
		var oldLbs = results.lbs;	
	
		context.innerCode = '<span id="deleteMe"><h3>Enter Updated Workout Data For Element #' + changeId + ' Here</h3><form class="form-horizontal" role="form"><div class="form-group"><label class="control-label col-sm-2" for="workoutForm">New Name:</label><div class="col-sm-10"><input type="text" class="form-control" id="nameUpdate" placeholder="' + oldName + '"></div><label class="control-label col-sm-2" for="workoutForm">New Reps:</label><div class="col-sm-10"><input type="text" class="form-control" id="repsUpdate" placeholder="' + oldReps + '"></div><label class="control-label col-sm-2" for="workoutForm">New Weight:</label><div class="col-sm-10"><input type="text" class="form-control" id="weightUpdate" placeholder="'+ oldWeight + '"></div><label class="control-label col-sm-2" for="workoutForm">New Date:</label><div class="col-sm-10"><input type="text" class="form-control" id="dateUpdate" placeholder="' + oldDate + '"></div><label class="control-label col-sm-2" for="workoutForm">New LBs:</label><div class="col-sm-10"><input type="text" class="form-control" id="lbsUpdate" placeholder="' + oldLbs + '"></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="submit" id="updateButton" class="btn btn-info">Submit Update</button></div></div></form></span>'
		context.changeId = changeId;

		res.send(context);
	});
});


//updating data
app.get('/submit-update',function(req, res, next) {
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


				pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err,rows, result){

					if(err) {
						next(err);
						return;
					}

					context.results = rows;
					context.status = 'Status: Updated ID ' + req.query.id + ' Successfully!';
					res.send(context);
				});
			});
		}
	});
});


//insert data***********************************************************************************
app.post('/insert',function(req,res,next){
	var context = {};

	pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)",
	[
		req.body.name, 
		req.body.reps, 
		req.body.weight, 
		req.body.date, 
		req.body.lbs
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

			context.newId = result.insertId;	
			context.results = rows // JSON.stringify(rows);
			context.status = 'Status: Inserted ID ' + result.insertId + ' Successfully!';
	
			res.send(context);
		});
	});
});


//delete data****************************************************************************************
app.post('/delete', function(req,res,next) {
	var context = {};
	pool.query("DELETE FROM workouts WHERE id=? ", 
	[
		req.body.id
	], function(err, result) {

    if(err) {
      next(err);
      return;
    }

    context.status = 'Status: ID ' + req.body.id + ' Deleted from Database';

	res.send(context);

  });
});


//reset table*****************************************************************************************
app.post('/reset-table', function(req, res, next) {
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
			
			context.results = "Table reset";
			context.status = "Table Truncated."	
		
			res.send(context);
		})
	});
});


//ERROR 404
app.use(function(request, response) {
        response.status(404);
       // response.send('ERROR 404 - NO PAGE FOUND');
		response.render('nopage');
});

//SYNTAX ERROR
app.use(function(error, request, response, next) {
        console.error(error.stack);
        response.status(500);
        //response.send('SYNTAX ERROR');
		response.render('errorpage');
});


app.listen(app.get('port'), function() {
	console.log('Port 3000');
});




/***************************************************



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


/***************************************************************



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
app.get('/submit-update',function(req, res, next) {
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


***************************************************/
