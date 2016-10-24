//Project Image
//Written by Sandeep Vattapparambil
//sandeepv68@gmail.com

//Use strict syntax and semantics
'use strict';
//create an Express class
var express = require('express');
//create an instance of Express class into an object
var primary_app_object = express();
//initial route for app
primary_app_object.get('/', function (req, res) {
  res.send('Hello World!');
});
//server function for the primary_app_object
primary_app_object.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
