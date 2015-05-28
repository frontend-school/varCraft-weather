var express = require('express');
var config = require('./lib/config');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var url = require('url');
var fs = require('fs');
var auth = require('./lib/auth');
var session = require('express-session');
var sessionStore = require('./lib/sessionStore');
var weatherResponse = require('./lib/weather');

var app = express();


app.set('port', config.get('port'));

http.createServer(app).listen(config.get('port'), function(){
	console.log('Express server listening on port ' + config.get('port'));
});

//app.use(bodyParser()); //req.body
app.use(cookieParser()); //req.cookies
//app.use(session({ secret: 'your secret here', cookie: { secure: false }} ));
//app.use(express.static('dist'));

app.get('/login', function(req, res, next){
	res.set('Access-Control-Allow-Origin', 'http://localhost:8080'  );
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Content-type', 'application/JSON');

	//console.log( req.session);

	// if(req.session.sid){
	// 	console.log("we are logged in", req.session.sid, "userName :", sessionStore[req.session.sid]);
	// }

	var parsedUrl = url.parse(req.url, true);
	var login = parsedUrl.query.login;
	var password = parsedUrl.query.password;

	//console.log("req session: ", req.session.username);
	//console.log(login, password);

	// Access-Control-Allow-Origin: домен
	// Access-Control-Allow-Credentials: true


	if(auth(login, password)){
		//console.log(req.headers.host, req.protocol);

		var sid = +(new Date());
    	// req.session.sid = sid;
    	// sessionStore[sid] = {};
    	// sessionStore[sid].login = parsedUrl.query.login;
    	// console.log(req.session);

		//console.log("login: " + parsedUrl.query.login);
		res.statusCode = 200;
		res.cookie('login', parsedUrl.query.login);

	    res.json({"status":"success"});
	    res.end();
    }
    else {
    	//console.log(parsedUrl.query.login);
		res.statusCode = 403;
	    res.json({"status":"failed"});
	    res.end();
    }
});

app.get('/logout', function(req, res, next){
		//console.log("run '/logout'");

	res.set('Access-Control-Allow-Origin', 'http://localhost:8080'  );//
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Content-type', 'application/JSON');

	res.statusCode = 200;
	res.clearCookie('login');
	res.json({"status":"success"});
	next();
});


app.get('/weather', function(req, res){

	if(req.cookies.login){

	// console.log(typeof cookies);
	//console.log("run /weather");
	res.set('Access-Control-Allow-Origin', 'http://localhost:8080'  );//
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Content-type', 'application/JSON');
	//console.log("Cookie: ", typeof req.cookies);
	res.statusCode = 200;

	res.json(weatherResponse);
	}
	else{
		res.set('Access-Control-Allow-Origin', 'http://localhost:8080'  );//
		res.set('Access-Control-Allow-Credentials', true);
		res.set('Content-type', 'application/JSON');

		res.statusCode = 403;
	    res.json({"status":"failed"});
	    res.end();
	}
	

});


app.use(function(req,res,next){
	res.statusCode = 404;
	res.end("page not found");
});


