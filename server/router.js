module.exports = function(app, needReload){

    var express = require('express'),
        bodyParser = require('body-parser'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler'),
        passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        authentication = require('./authentication');

    var login,
        password,
        refreshedTime,
        appFolder = 'dist/';

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

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    //
        //function (req, res) {
        //login = req.body.login;
        //password = req.body.password;
        //if(databaseHandler.userExists(login,password))
        //{
        //    res.status(200).send('success');
        //    res.redirect('/weather');
        //}
        //else
        //{
        //    res.status(403).send('failed');
        //}
    //});

    app.get('/login', function (req, res) {
        var login = req.query.login;
        var password = req.query.password;
        //var status = authentication.addUser(login, password);
        if(!databaseHandler.userExists(login,password)) return;
        //if(status === 0)
        {
            res.status(200).redirect('/weather');
        }
        //else
        {
            //res.status(403).send('{status:"fail"}');
        }
    });

    app.get('/logout', function (req, res) {
        var status = authentication.removeUser();
        res.redirect('/');
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
        //if((databaseHandler.userExists(login, password)) && (login)){
            var content = pageConstructor.constructPage({
                'index': appFolder + 'index.html',
                '@content': appFolder + 'block/weather-screen/weather-screen.html',
                '@placeHolder1': appFolder + 'block/header-main/header-main.html',
                '@user': 'Hello, ' + login + '!'
            });
            res.send(content);
            refreshedTime = new Date().getTime();
        //}
        //else {
        //    res.redirect('/logout');
        //}
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
};

//exports.router = router;