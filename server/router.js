module.exports = function(app, needReload){

    var express = require('express'),
        bodyParser = require('body-parser'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler');

    var login,
        password,
        refreshedTime,
        appFolder = 'dist/';

    app.use('/dist', express.static('dist'));
    app.use('/block', express.static('block'));
    app.use('/icon', express.static('icon'));
    app.use('/font', express.static('font'));
    app.use(bodyParser.urlencoded({extended: false}));

    app.post('/login', function (req, res) {
        login = req.body.login;
        password = req.body.password;
        if(databaseHandler.userExists(login,password))
        {
            res.status(200).send('success');
            res.redirect('/weather');
        }
        else
        {
            res.status(403).send('failed');
        }
    });

    app.get('/login', function (req, res) {
        login = req.query.login;
        password = req.query.password;
        if(databaseHandler.userExists(login,password))
        {
            res.status(200).redirect('/weather').send('success');
        }
        else
        {
            res.status(403).send('Failed. No such user found.');
        }
    });

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
        if((databaseHandler.userExists(login, password)) && (login)){
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
        refreshedTime = new Date().getTime();
    });

    app.get('/logout', function (req, res) {
        login = undefined;
        password = undefined;
        res.redirect('/');
    });
};

//exports.router = router;