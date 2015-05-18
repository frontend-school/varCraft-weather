var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    url = require('url'),
    app = express();


var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    var host = server.address().address,
        port = server.address().port;
    console.log('Web application is available at http://%s:%s', host, port);
});
app.use(bodyParser());
app.use(cookieParser());

app.get('/login', function (req, res) {
    console.log("run '/login'");
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.set('Access-Control-Allow-Credentials', true);
    //for now without checking
    res.status(200).send({status: "success", desc: "Logined", sid: null, login: null});//add login
});

app.get('/logout', function (req, res) {
    console.log("run '/logout'");
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.set('Access-Control-Allow-Credentials', true);
    //for now without checking
    res.status(200).send({status: "success", desc: "Logouted", sid: null, login: null});
});

