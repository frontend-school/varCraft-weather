var express = require('express');
var weather = require('./weather.js');
var app = module.exports.app = exports.app = express();

// for accessing from another server
app.all('/login', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send();
});

app.all('/logout', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.status(200).send();
});

app.all('/weather', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.status(200).json(weather.getWeather());
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});