module.exports = function(app, needReload) {
    var express = require('express'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler'),
        http = require('http'),
        authentication = require('./authentication');

    app.get('/login', function (req, res) {
        var login = req.query.login;
        var password = req.query.password;
        var dt = new Date().getTime();
        res.cookie('sid', dt, {expires: new Date(dt + 1800000), httpOnly: true});
        res.cookie('login', login, {expires: new Date(dt + 1800000), httpOnly: true});
        var status = authentication.addUser(login, password, dt);

        if (status === 0) {
            res.status(200).send({status: "success", desc: "Logined", sid: status[1], login: login});
        }
        else if (status === 2) {
            res.status(200).send({status: "success", desc: "Session prolonged", sid: status[1], login: login});
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

    app.get('/logout', function (req, res) {
        var sid = req.cookies.sid;
        var dt = new Date().getTime();
        res.cookie('sid', dt, {expires: new Date(dt + 100), httpOnly: true});
        if (sid != null) {
            authentication.removeUser(sid);
            res.clearCookie('sid');
            res.clearCookie('login');
            res.status(200).send({status: "success", desc: "Logouted", sid: null, login: null});
        }
        else {
            res.clearCookie('sid');
            res.clearCookie('login');
            res.status(403).send({status: "fail", desc: "No active session", sid: null, login: null});
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
};