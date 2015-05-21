var express = require('express'),
    url = require('url'),
    querystring = require('querystring');
var app = express();

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
    res.send('Hello World');
});

var response = {
    'humidity': 0.98,
    'weather': 'snowfall',
    'windDirMax': 'N'
};

var authParams = {
    login: '',
    sid: '',
    desc: ''
};

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

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});