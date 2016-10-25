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
var session = require('express-session');
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
  }else if(err){
    console.log("Database not connected.....\n\n");
  }
});

primary_app_object.set('port', 3000);//Set the port to run the http server
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
primary_app_object.use(morgan('combined'));//Set the morgan logging system
primary_app_object.use(session({secret: 'project_image'}));//Here ‘secret‘ is used for cookie handling etc but we have to put some secret for managing Session in Express.

var session_var;//Instanciate a variable for session management

//initial route for app
primary_app_object.get('/', function (req, res) {
  session_var = req.session;
  session_var.state = 'initial';
  res.render('login');
});
//login route for app
primary_app_object.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var sql = 'SELECT * FROM user where username= "'+username+'" AND password="'+password+'"';
  console.log(sql);
  connection.query(sql, function(err, results) {
        if(err){
          console.log("SQL Error");
        }
        else if(results.length === 0){
          console.log("No User Record Found");
          session_var = req.session;
          session_var.state = 'Login Error';
          var return_value = 'No User Record Found';
          session_var.message = return_value;
        }
        else if(results.length > 0){
          console.log("User Record Found");
          session_var = req.session;
          var id = results[0].id;
          var username = results[0].username;
          session_var.user_id = id;
          session_var.username = username;
        }
      });
});





//sample route
primary_app_object.get('/hello', function (req, res) {
  res.send('Hello World! login');
});


//server function for the primary_app_object
primary_app_object.listen(primary_app_object.get('port'));
console.log('Express server listening on port ' + primary_app_object.get('port'));
