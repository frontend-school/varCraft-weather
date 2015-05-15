var express = require('express');
var config = require('./config');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var url = require('url');
var fs = require('fs');
var auth = require('./auth');

var app = express();

app.set('port', config.get('port'));

http.createServer(app).listen(config.get('port'), function(){
	console.log('Express server listening on port ' + config.get('port'));
});

app.use(bodyParser()); //req.body
app.use(cookieParser()); //req.cookies

//app.use(express.static('dist'));

app.get('/login', function(req, res){
	res.set('Access-Control-Allow-Origin', 'http://localhost:8080'  );
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Content-type', 'application/JSON');
	

	var parsedUrl = url.parse(req.url, true);
	var login = parsedUrl.query.login;
	var password = parsedUrl.query.password;
	console.log(login, password);

	// Access-Control-Allow-Origin: домен
	// Access-Control-Allow-Credentials: true

	if(auth(login, password)){
		console.log(req.headers.host, req.protocol);

		console.log("login: " + parsedUrl.query.login);

		res.statusCode = 200;
		res.cookie('login', parsedUrl.query.login);
	    res.json({"status":"success"});
	    res.end();
    }
    else {
    	console.log(parsedUrl.query.login);
		res.statusCode = 403;
	    res.json({"status":"failed"});
	    res.end();
    }
});

app.get('/logout', function(req, res){
		console.log("run '/logout'");

	res.set('Access-Control-Allow-Origin', 'http://localhost:8080'  );//
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Content-type', 'application/JSON');

	res.statusCode = 200;
	res.clearCookie('login');
	res.json({"status":"success"});
});


app.use(function(req,res,next){
	res.statusCode = 404;
	res.end("page not found");
});

// app.use(function(req,res,next){
// 	if(req.url == '/'){
// 	console.log("run '/'");
// 	var file = new fs.ReadStream('./dist/index.html');
// 	sendFile(file, res);

//     }
//     else{
//     	next();
//     }
// });

// function sendFile(file, res){
// 	file.pipe(res);

// 	file.on('error', function(err){
// 		res.statusCode = 500;
// 		res.end('server Error');
// 		console.log(err);
// 	});

// 	file.on('close', function(){
// 		file.destroy();
// 	})
// }







// app.use(function(req, res){
// 	res.send('404', 'page not found');
// });

// app.use(function(req, res, next){
// 	if(req.url == '/'){
// 	res.end('Hello!');}
// 	else next();
// });

// app.use(function(req, res, next){
// 	if(req.url == '/test'){
// 		res.end('test!');}
// 	else next();
// });

// app.use(function(req, res){
// 	res.send('404', 'page not found');
// });

// app.use(function(req, res){
// 	if(req.url == '/forbidden'){
// 		next(new Error("oops!"));
// 	}
// })


//MiddleWare обработчик серверного запроса