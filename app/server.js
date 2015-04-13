var express = require('express'),
    pageConstructor = require('./pageConstructor'),
    dataBaseHandler = require('./dataBaseHandler');

var app = express();

app.use('/block', express.static('block'));

app.get('/', function (req, res) {
    var content = pageConstructor.construct('index.html', {
        '@content':'block/login-form/login-form.html',
        '@placeHolder1':'block/header-main/header-main.html'
    });
    res.send(content);
});

app.get('/weather', function (req, res) {
    var content = pageConstructor.construct('index.html', {
        '@content':'block/weather/weather.html',
        '@placeHolder1':'block/header-main/header-main.html'
    });
    res.send(content);
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
