var needReload = false;
runServer();
function runServer() {
    var express = require('express'),
        bodyParser = require('body-parser'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler');

    var app = express();

    //To use web service only remove the underlying string and optionally file 'server/router.js'
    require('./router')(app, needReload);
    require('./webService')(app, needReload);

    var port = process.env.PORT || 3000;
    var server = app.listen(port, function () {

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