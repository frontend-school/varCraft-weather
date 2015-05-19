runServer();
function runServer() {
    var express = require('express'),
        databaseHandler = require('./databaseHandler');

    var app = express();

    require('./userWebService')(app);

    var port = process.env.PORT || 3000;
    var server = app.listen(port, function () {

        var host = server.address().address;
        var port = server.address().port;
        console.log('Web application is available at http://%s:%s', host, port);
    });
}

exports.runServer = runServer;