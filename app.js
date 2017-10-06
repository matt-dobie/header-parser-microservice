/*
  Author: Matthew Dobie
  Author URL: mattdobie.com
  Description: Server file for Header Parser Microservice
*/


// Import express
var express = require('express');

// Create instance of express & port variable
var app = express();
var port = process.env.PORT || 8080;

// Serve static index page
app.use(express.static('public'));

// Route to index page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Get call to return JSON browser info
app.get('/whoami', function(req, res) {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ip = ip.split(",")[0];

  var language = req.headers['accept-language'].split(",")[0];

  var software = req.headers['user-agent'].split(/[\(\)]/)[1];

  res.json({
    ip_address: ip,
    language: language,
    software: software
  });

});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if (err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

// Listen for requests
app.listen(port, function() {
  console.log("Listening on port " + port + "...");
});
