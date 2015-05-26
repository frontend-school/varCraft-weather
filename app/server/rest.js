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
console.log(weatherResponse);

var newForecast1 = {}, newForecast2 = {}, newForecast3 = {};

        newForecast1.date = "24 / 05 / 2015";
        newForecast1.weatherCondition = "Sun";
        newForecast1.temperatureAtDay = "+15";
        newForecast1.temperatureAtNight = "+13";
        newForecast1.windSpeed = "17mph";
        newForecast1.windDirection = "se";
        newForecast1.moonPhase = 2;
        newForecast1.humidity = 2;
        newForecast1.humidityTitle = "60%";

        newForecast2.date = "25 / 05 / 2015";
        newForecast2.weatherCondition = "Snow";
        newForecast2.temperatureAtDay = "-15";
        newForecast2.temperatureAtNight = "+13";
        newForecast2.windSpeed = "17mph";
        newForecast2.windDirection = "se";
        newForecast2.moonPhase = 2;
        newForecast2.humidity = 2;
        newForecast2.humidityTitle = "60%";

        newForecast3.date = "26 / 05 / 2015";
        newForecast3.weatherCondition = "Rain";
        newForecast3.temperatureAtDay = "+15";
        newForecast3.temperatureAtNight = "+13";
        newForecast3.windSpeed = "17mph";
        newForecast3.windDirection = "se";
        newForecast3.moonPhase = 2;
        newForecast3.humidity = 2;
        newForecast3.humidityTitle = "60%";

var response = {"yesterday": newForecast1, "today": newForecast2, "tomorrow": newForecast3};


var app = express();


app.set('port', config.get('port'));

http.createServer(app).listen(config.get('port'), function(){
	console.log('Express server listening on port ' + config.get('port'));
});

//app.use(bodyParser()); //req.body
app.use(cookieParser()); //req.cookies
app.use(session({ secret: 'your secret here', cookie: { secure: false }} ));
//app.use(express.static('dist'));

app.get('/login', function(req, res, next){
	res.set('Access-Control-Allow-Origin', 'http://localhost:8080'  );
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Content-type', 'application/JSON');

	console.log( req.session);

	if(req.session.sid){
		console.log("we are logged in", req.session.sid, "userName :", sessionStore[req.session.sid]);
	}

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
    	req.session.sid = sid;
    	sessionStore[sid] = {};
    	sessionStore[sid].login = parsedUrl.query.login;
    	console.log(req.session);

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

app.get('/logout', function(req, res, next){
		console.log("run '/logout'");

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
	console.log("run /weather");
	res.set('Access-Control-Allow-Origin', 'http://localhost:8080'  );//
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Content-type', 'application/JSON');
	console.log("Cookie: ", typeof req.cookies);
	res.statusCode = 200;

	res.json(response);
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