var express = require('express'),
    pageConstructor = require('./pageConstructor'),
    databaseHandler = require('./databaseHandler'),
    bodyParser = require('body-parser');

var app = express(),
    login,
    password;

app.use('/block', express.static('block'));
app.use('/icon', express.static('icon'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    if(!login) {
        var content = pageConstructor.construct('index.html', {
            '@content': 'block/login-form/login-form.html',
            '@placeHolder1': 'block/header-main/header-main.html'
        });
        res.send(content);
    }
    else
    {
        res.redirect('/weather');
    }
});

app.get('/weather', function (req, res) {
    setTimeout(function(){
        login = undefined;
        password = undefined;
    }, 1800000);
    if(databaseHandler.userExists(login, password)) {
        //var weatherInfo = pageConstructor.construct()

        var content = pageConstructor.construct('index.html', {
            '@content': 'block/weather-wrapper/weather-wrapper.html',
            '@placeHolder1': 'block/header-main/header-main.html',
            '@header-1-weather': 'block/weather-header/weather-header.html',
            '@header-2-weather': 'block/weather-header/weather-header.html',
            '@header-3-weather': 'block/weather-header/weather-header.html',
            '@weather-1': 'block/weather/weather.html',
            '@weather-2': 'block/weather/weather.html',
            '@weather-3': 'block/weather/weather.html'
        }, login);
        res.send(content);
        refreshTime = (new Date()).getTime();
    }
    else
    {
        res.redirect('/logout');
    }
});

app.post('/login', function (req, res) {
    login = req.body.login;
    password = req.body.password;
    res.redirect('/weather');
});

app.get('/logout', function (req, res) {
    login = undefined;
    password = undefined;
    res.redirect('/');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
