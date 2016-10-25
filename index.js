//Project Image
//Written by Sandeep Vattapparambil
//sandeepv68@gmail.com

'use strict';//Use strict syntax and semantics
var http = require('http');//Include the Node HTTP library
var express = require('express');//create an Express class
var primary_app_object = express();//create an instance of Express class into an object
var connect = require('connect');
var responseTime = require('response-time');//Response time middleware for Node.js servers
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
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

primary_app_object.set('port', 3000);
primary_app_object.set('view engine', 'jade');// Set the view engine
primary_app_object.set('views', './views');// Where to find the view files
primary_app_object.use(express.static('./public'));//where to find static files
primary_app_object.use(responseTime());// Add the responseTime middleware
primary_app_object.use(errorhandler());// Add the errorHander middleware
primary_app_object.use(bodyParser.urlencoded({ extended: true }));// parse application/x-www-form-urlencoded
primary_app_object.use(bodyParser.json());// parse application/json
primary_app_object.use(errorhandler());
primary_app_object.use(compression());
primary_app_object.use(cookieParser());
primary_app_object.use(morgan('combined'));

//initial route for app
primary_app_object.get('/', function (req, res) {
  res.render('index');
});
//login route for app
primary_app_object.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  connection.query('SELECT * FROM user', function(err, results) {
        if (err) throw err
        console.log(results[0].id);
        console.log(results[0].first_name);
        console.log(results[0].last_name);
        console.log(results[0].username);
        console.log(results[0].password);
        if(results != 0){
          console.log('found');
        }
      })
});





//sample route
primary_app_object.get('/hello', function (req, res) {
  res.send('Hello World! login');
});


//server function for the primary_app_object
primary_app_object.listen(primary_app_object.get('port'));
console.log('Express server listening on port ' + primary_app_object.get('port'));
