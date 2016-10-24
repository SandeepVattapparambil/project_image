//Project Image
//Written by Sandeep Vattapparambil
//sandeepv68@gmail.com

'use strict';//Use strict syntax and semantics
var http = require('http');//Include the Node HTTP library
var express = require('express');//create an Express class

var primary_app_object = express();//create an instance of Express class into an object
primary_app_object.set('view engine', 'jade');// Set the view engine
primary_app_object.set('views', './views');// Where to find the view files

//initial route for app
primary_app_object.get('/', function (req, res) {
  res.render('index');
});

//sample route
primary_app_object.get('/login', function (req, res) {
  res.send('Hello World! login');
});


//server function for the primary_app_object
primary_app_object.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
