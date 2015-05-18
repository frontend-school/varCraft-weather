var express = require('express');
var app = module.exports.app = exports.app = express();

// for accessing from another server
app.all('/login', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send();
});
app.all('/logout', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send();
});

// mock for login - always OK
app.get('/login', function (req, res) {
    res.statusCode = 200;
    res.send();
});

// mock for logout - always OK
app.get('/logout', function (req, res) {
    res.statusCode = 200;
    res.send();
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});