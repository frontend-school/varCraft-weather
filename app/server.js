var express = require('express'),
    pageConstructor = require('./pageConstructor');
var app = express();



app.use('/block', express.static('block'));

app.get('/', function (req, res) {
    var content = pageConstructor.construct('index.html', 'block/login-form/login-form.html');
    res.send(content);
});

app.get('/weather', function (req, res) {
    var content = pageConstructor.construct('index.html', 'block/weather/weather.html');
    res.send(content);
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
