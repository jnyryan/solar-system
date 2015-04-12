var express = require("express");
var http = require('http');

var app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/web/index.html');
  });


var port = Number(process.env.PORT || 5000);

var server = http.createServer(app).listen(port, '0.0.0.0', function() {
  console.log("Solar System Polymer is listening on " + port);
});

app.use(express.static(__dirname + '/web'));
app.use(express.static(__dirname + '/bower_components'));
