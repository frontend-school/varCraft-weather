module.exports = function(app, needReload){

    var express = require('express'),
        bodyParser = require('body-parser'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler'),
        cookieParser = require('cookie-parser'),
        authentication = require('./authentication');

    var appFolder = 'dist/';

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

    app.get('/login', function (req, res) {
        var login = req.query.login;
        var password = req.query.password;
        var status = generateResponse(res, login, password);
        if(status[0] === 0) {
            res.status(200).send({status:"success",desc:"Logined",sid:status[1],login:login});
        }
        else if(status[0] === 2) {
            res.status(200).send({status:"success",desc:"Session prolonged",sid:status[1],login:login});
        }
        else if(status[0] === 1) {
            res.status(403).send({status:"fail",desc:"No such user found",sid:null,login:null});
        }
        else if(status[0] === 3) {
            res.status(403).send({status:"fail",desc:"Incorrect login or sid. Login must contain at least one non-digit symbol",sid:null,login:null});
        }
        else {
            res.status(403).send({status:"fail",desc:"Unhandled error occurred",sid:null,login:null});
        }
    });

    app.get('/logout', function (req, res) {
        var sid = req.cookies.sid;
        var dt = new Date().getTime();
        res.cookie('sid', dt, {expires: new Date(dt + 100), httpOnly: true});
        if(sid != null) {
            authentication.removeUser(sid);
            res.clearCookie('sid');
            res.clearCookie('login');
            res.status(200).send({status:"success", desc:"Logouted", sid:null, login:null});
        }
        else {
            res.clearCookie('sid');
            res.clearCookie('login');
            res.status(403).send({status:"fail", desc:"No active session", sid:null, login:null});
        }
    });

    app.get('/ask', function(req, res){
        try {
            var sid = req.cookies.sid;
            var dt = new Date().getTime();
            if (dt - sid > 180000) {
                authentication.removeUser(sid);
                res.status(403).send({
                    status: "fail",
                    desc: "Session timeout or user is offline",
                    sid: null,
                    login: null
                });
            }
            else {
                res.status(200).send({
                    status: "success",
                    desc: "User is online",
                    sid: sid,
                    login: authentication.getUser(sid).login
                });
            }
        }
        catch(err){

        }
    });

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
            console.log('Error occurred in "/" router');
        }
    });

    function clear(req, res){
        var cookieSid = req.cookies.sid;
        var sessionUser = authentication.getUser(cookieSid);
        var dt = new Date().getTime();
        if((cookieSid && !sessionUser) || (!cookieSid)){
            res.clearCookie('sid');
            res.redirect('/');
        }
    }

    app.get('/weather', function (req, res) {
        try {
            clear(req, res);

            var sid = req.cookies.sid;
            var user = authentication.getUser(sid);
            var content = pageConstructor.constructPage({
                'index': appFolder + 'index.html',
                '@content': appFolder + 'block/weather-screen/weather-screen.html',
                '@placeHolder1': appFolder + 'block/header-main/header-main.html',
                '@user': 'Hello, ' + user.login
            });
            res.send(content);
        }
        catch(err){
            console.log('Error occurred in "/weather" router');
        }
    });
};