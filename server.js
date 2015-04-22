var needReload = false;
function runServer() {
    var express = require('express'),
        bodyParser = require('body-parser'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler'),
        lr;

    var app = express();

    var login,
        password,
        refreshedTime,
        appFolder = 'dist/';

    app.use('/dist', express.static('dist'));
    app.use('/block*', express.static('block'));
    app.use('/icon', express.static('icon'));
    app.use('/font', express.static('font'));
    app.use(bodyParser.urlencoded({extended: false}));

    app.get('/', function (req, res) {
        if (!login) {
            var content = pageConstructor.constructPage({
                'index': appFolder + 'index.html',
                '@content': appFolder + 'block/login-form/login-form.html',
                '@placeHolder1': ''
            });
            res.send(content);
        }
        else {
            res.redirect('/weather');
        }
    });

    app.get('/weather', function (req, res) {
        if (databaseHandler.userExists(login, password)) {
            var content = pageConstructor.constructPage({
                'index': appFolder + 'index.html',
                '@content': appFolder + 'block/weather-screen/weather-screen.html',
                '@placeHolder1': appFolder + 'block/header-main/header-main.html',
                '@user': 'Hello, ' + login + '!'
            });
            res.send(content);
            refreshedTime = new Date().getTime();
        }
        else {
            res.redirect('/logout');
        }
    });

    app.get('/ask', function(req, res){
        var result = {
            'login':login,
            'needReload':needReload,
            'needLogout':(new Date().getTime() - refreshedTime) >= 1800000
        };
        if(result.needLogout){
            login = '';
            password = '';
        }
        res.send(result);
        needReload = false;
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

    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Web application is available at http://%s:%s', host, port);
    });
}

function reload(){
    needReload = true;
}

exports.runServer = runServer;
exports.reload = reload;