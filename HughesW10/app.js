var express = require('express');
var handlebars = require('express-handlebars');
var mysql = require('mysql');

connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

connection.connect();
