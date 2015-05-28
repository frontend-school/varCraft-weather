var express = require('express'),
    url = require('url'),
    querystring = require('querystring');
var app = express();

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
    res.send('Hello World');
});

var authParams = {
    login: '',
    sid: '',
    desc: ''
};

var mockWeather = [{
    "dateTimeISO": "2015-05-26T07:00:00+03:00",
    "avgTempDayC": 23,
    "avgTempNightC": 17,
    "windSpeedMPH": 7,
    "weather": "Light Rain",
    //"weather": "Partly Cloudy with Scattered Showers",
    "windDirMax": "SE",
    "humidity": 64,
    "moonPhaseName": "waxing crescent"
}, {
    "dateTimeISO": "2015-05-27T07:00:00+03:00",
    "avgTempDayC": 23,
    "avgTempNightC": 16,
    "windSpeedMPH": 8,
    "weather": "Partly Cloudly",
    //"weather": "Partly Cloudy with Isolated Showers",
    "windDirMax": "S",
    "humidity": 64,
    "moonPhaseName": "waxing crescent"
}, {
    "dateTimeISO": "2015-05-28T07:00:00+03:00",
    "avgTempDayC": 16,
    "avgTempNightC": 13,
    "windSpeedMPH": 9,
    "weather": "Partly Cloudly",
    //"weather": "Partly Cloudy with Isolated Showers",
    "windDirMax": "NW",
    "humidity": 86,
    "moonPhaseName": "first quarter"
}];


/*app.all('/login', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.json(authParams);
});*/

app.all('/logout', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    authParams.login = null;
    authParams.sid = null;
    authParams.desc = 'logging out';

    res.json(authParams);
});

app.all('/weather', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.json(mockWeather);
});

app.get('/login', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var getParams = querystring.parse(url.parse(req.url).query);

    authParams.login = getParams['login'] || '';
    authParams.sid = (new Date()).toISOString();
    authParams.desc = 'logging in';

    res.json(authParams);
    res.status(200).send();
});

app.get('/logout', function(req, res){
    res.status(200).send();
});

app.get('/weather', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.json(mockWeather);
    res.status(200).send();
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

