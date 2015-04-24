var needReload = false;
runServer();
function runServer() {
    var express = require('express'),
        bodyParser = require('body-parser'),
        pageConstructor = require('./pageConstructor'),
        databaseHandler = require('./databaseHandler');

    var app = express();

    //var login,
    //    password,
    //    refreshedTime,
    //    appFolder = 'dist/';

    //var router = require('./router')(app);

    //app.use(app.router);
    app.use('/dist', express.static('dist'));
    app.use('/block', express.static('block'));
    app.use('/icon', express.static('icon'));
    app.use('/font', express.static('font'));
    app.use(bodyParser.urlencoded({extended: false}));

    require('./router')(app,needReload);

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