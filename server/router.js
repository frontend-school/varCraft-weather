module.exports = function(app){

    var express = require('express'),
        bodyParser = require('body-parser'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler'),
        cookieParser = require('cookie-parser'),
        http = require('http'),
        authentication = require('./authentication');

    var appFolder = '../dist/';

    app.use('/dist', express.static('dist'));
    app.use('/block', express.static('block'));
    app.use('/icon', express.static('icon'));
    app.use('/font', express.static('font'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    app.post('/login', function (req, res) {
        var login = req.body.login;
        var password = req.body.password;
        var status = generateResponse(res,login,password);
        if((status[0] === 0) || (status[0] === 2)) {
            res.redirect('/weather');
        }
    });

    function generateResponse(res, login, password){
        var dt = new Date().getTime();
        res.cookie('sid', dt, {expires: new Date(dt + 1800000), httpOnly: true});
        res.cookie('login', login, {expires: new Date(dt + 1800000), httpOnly: true});
        var status = authentication.addUser(login, password, dt);
        return [status, dt];
    }

    function clear(req, res){
        var cookieSid = req.cookies.sid;
        var sessionUser = authentication.getUser(cookieSid);
        var dt = new Date().getTime();
        if((cookieSid) && (!sessionUser)){
            res.clearCookie('sid');
            res.redirect('/');
        }
    }

    app.get('/', function (req, res) {
        try{
            var sid = req.cookies.sid;
            if(sid) {
                res.redirect('/weather');
            }
            else {
                var content = pageConstructor.constructPage({
                    'index': appFolder + 'index.html',
                    '@content': appFolder + 'block/login-form/login-form.html',
                    '@placeHolder1': ''
                });
                res.send(content);
            }
        }
        catch(err){
        }

    });

    app.get('/weather', function (req, res) {
        try {
            clear(req, res);

            var sid = req.cookies.sid;
            if(sid) {
                var user = authentication.getUser(sid);
                var content = pageConstructor.constructPage({
                    'index': appFolder + 'index.html',
                    '@content': appFolder + 'block/weather-screen/weather-screen.html',
                    '@placeHolder1': appFolder + 'block/header-main/header-main.html',
                    '@user': 'Hello, ' + user.login
                });
                res.send(content);
            }
            else{
                res.redirect('/');
            }
        }
        catch(err){

        }
    });
};