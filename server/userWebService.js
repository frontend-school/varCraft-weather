module.exports = function(app) {
    var express = require('express'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler'),
        authentication = require('./authentication'),
        cookieParser = require('cookie-parser');

    app.use(express.cookieParser());

    app.all('/login', function (req, res) {
        var login = req.query.login;
        var password = req.query.password;
        var dt = new Date().getTime();
        var sid = "";
        if ((req.cookies) && (req.cookies.sid)) {
            sid = req.cookies.sid;
        }
        if((sid) && (!authentication.getUser(login))) {
            res.status(403).send({status: "fail", desc: "Unclosed session was detected from this browser. Perform /logout operation to clear cookies", sid: null, login: null});
            return;
        }
        res.cookie('sid', dt, {expires: new Date(dt + 1800000), httpOnly: false});
        var status = authentication.addUser(login, password, dt);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        if (status === 0) {
            res.status(200).send({status: "success", desc: "Logined", sid: dt, login: login});
        }
        else if (status === 2) {
            res.status(200).send({status: "success", desc: "Session prolonged", sid: dt, login: login});
        }
        else if (status === 1) {
            res.status(403).send({status: "fail", desc: "No such user found", sid: null, login: null});
        }
        else if (status === 3) {
            res.status(403).send({
                status: "fail",
                desc: "Incorrect login or sid. Login must contain at least one non-digit symbol",
                sid: null,
                login: null
            });
        }
        else {
            res.status(403).send({status: "fail", desc: "Unhandled error occurred", sid: null, login: null});
        }
    });

    app.all('/logout', function (req, res) {
        var sid = req.cookies.sid;
        var dt = new Date().getTime();
        res.cookie('sid', dt, {expires: new Date(dt + 100), httpOnly: true});
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        if (sid != null) {
            authentication.removeUser(sid);
            res.clearCookie('sid');
            res.status(200).send({status: "success", desc: "Logouted", sid: null, login: null});
        }
        else {
            res.clearCookie('sid');
            res.status(403).send({status: "fail", desc: "No active session", sid: null, login: null});
        }
    });

    app.get('/ask', function(req, res){
        try {
            var sid = req.cookies.sid;
            var dt = new Date().getTime();
            if((dt - sid > 180000) || (!sid)) {
                authentication.removeUser(sid);
                res.status(403).send({
                    status: "fail",
                    desc: "Session timeout or user was never loged on",
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
            console.log('asdasdasd');
        }
    });
};