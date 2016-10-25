//Project Image
//Written by Sandeep Vattapparambil
//sandeepv68@gmail.com

'use strict';//Use strict syntax and semantics
var http = require('http');//Include the Node HTTP library
var express = require('express');//create an Express class
var primary_app_object = express();//create an instance of Express class into an object
var responseTime = require('response-time');//Response time middleware for Node.js servers
var mysql = require('mysql');//create mysql object
var connection = mysql.createConnection({
  host     : 'localhost',//Database host
  user     : 'root',//Database host name
  password : '',//Database host password
  database : 'project_image'
});
connection.connect(function(err){
  if(!err){
    console.log("\nDatabase is connected....\n\n");
  }else{
    console.log("Database not connected.....\n\n");
  }
});

primary_app_object.set('view engine', 'jade');// Set the view engine
primary_app_object.set('views', './views');// Where to find the view files
primary_app_object.use(express.static('./public'));//where to find static files
primary_app_object.use(express.responseTime());// Add the responseTime middleware
//initial route for app
primary_app_object.get('/', function (req, res) {
  res.render('index');
});
//login route for app
primary_app_object.get('/login', function (req, res) {
  res.render('index');
});

//sample route
primary_app_object.get('/hello', function (req, res) {
  res.send('Hello World! login');
});


//server function for the primary_app_object
primary_app_object.listen(3000, function () {
  console.log('App listening on port 3000!');
});
