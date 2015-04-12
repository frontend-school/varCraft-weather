var express = require('express'),
    pageConstructor = require('./pageConstructor');
var app = express();

var content = pageConstructor.construct('index.html', 'block/b-login-form/b-login-form.html');

app.use('/block', express.static('block'));
app.get('/', function (req, res) {
    res.send(content);
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
