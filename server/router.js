module.exports = function(app, needReload){

    var express = require('express'),
        bodyParser = require('body-parser'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler'),
        //passport = require('passport'),
        //LocalStrategy = require('passport-local').Strategy,
        cookieParser = require('cookie-parser'),
        http = require('http'),
        authentication = require('./authentication');

    var //login,
        //password,
        //refreshedTime,
        appFolder = '../dist/';

    //app.configure(function() {
    //    app.use(express.static('public'));
    //    app.use(express.cookieParser());
    //    app.use(express.bodyParser());
    //    app.use(express.session({ secret: 'keyboard cat' }));
    //    app.use(passport.initialize());
    //    app.use(passport.session());
    //    app.use(app.router);
    //});

    //passport.use(new LocalStrategy(
    //    function(username, password, done) {
    //        User.findOne({ username: username }, function(err, user) {
    //            if (err) { return done(err); }
    //            if (!user) {
    //                return done(null, false, { message: 'Incorrect username.' });
    //            }
    //            if (!user.validPassword(password)) {
    //                return done(null, false, { message: 'Incorrect password.' });
    //            }
    //            return done(null, user);
    //        });
    //    }
    //));

    app.use('/dist', express.static('dist'));
    app.use('/block', express.static('block'));
    app.use('/icon', express.static('icon'));
    app.use('/font', express.static('font'));
    //app.use(passport.initialize());
    //app.use(passport.session());
    //app.use(express.cookieDecoder());
    //app.use(express.session());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    app.post('/login', function (req, res) {
        var login = req.body.login;
        var password = req.body.password;
        var status = generateResponse(res,login,password);
        if((status[0] === 0) || (status[0] === 2)) {
            res.redirect('/weather');
        }
        //res.redirect('/login?login=' + login + '&password=' + password);
        //if(databaseHandler.userExists(login,password))
        //{
        //    res.status(200).send('success');
        //    res.redirect('/weather');
        //}
        //else
        //{
        //    res.status(403).send('failed');
        //}
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
            res.cookie('sid', dt, {expires: new Date(dt + 100), httpOnly: true});
        }
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
        //res.redirect('/');
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

        //var result = {
        //    'login':login,
        //    'needReload':needReload,
        //    'needLogout':(new Date().getTime() - refreshedTime) >= 1800000
        //};
        //if(result.needLogout){
        //    login = '';
        //    password = '';
        //}
        //res.send(result);
        //needReload = false;
        //refreshedTime = new Date().getTime();
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
        }
        //if(req.cookies.sid > -1) {
        //    var content = pageConstructor.constructPage({
        //        'index': appFolder + 'index.html',
        //        '@content': appFolder + 'block/login-form/login-form.html',
        //        '@placeHolder1': ''
        //    });
        //    res.send(content);
        //}
        //else {
        //    res.redirect('/weather');
        //}
    });

    app.get('/weather', function (req, res) {
        try {

            var cookieSid = req.cookies.sid;
            var sessionUser = authentication.getUser(cookieSid);
            var dt = new Date().getTime();
            if((cookieSid) && (!sessionUser)){
                res.clearCookie('sid');
            }

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
            //res.redirect('/');
        }
    });
};