//api - 788362a84fe3647e4bc964823a588f45
/*var o = {
 "coord":{
 "lon":30.52,"lat":50.43
 },
 "sys":{
 "message":0.0211,
 "country":"UA",
 "sunrise":1428808192,
 "sunset":1428857250},
 "weather":[{
 "id":801,
 "main":"Clouds",
 "description":"few clouds",
 "icon":"02n"
 }],
 "base":"stations",
 "main":{
 "temp":286.717,
 "temp_min":286.717,
 "temp_max":286.717,
 "pressure":1021.93,
 "sea_level":1036.86,
 "grnd_level":1021.93,
 "humidity":59
 },
 "wind":{
 "speed":6.41,
 "deg":343.501
 },
 "clouds":{
 "all":24
 },
 "dt":1428877149,
 "id":703448,
 "name":"Kiev",
 "cod":200
 };*/
var request = 'http://api.openweathermap.org/data/2.5/weather?q=Kiev,ua';//&APPID=788362a84fe3647e4bc964823a588f45';
var result = {};
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        result = JSON.parse(xmlhttp.responseText);
        write();
    }
};

function write()
{
    document.getElementById('weather-city').innerHTML = 'Current weather in ' + result.name + ':';
    document.getElementById('weather-temperature').innerHTML = 'Temperature: ' + (+result.main.temp - 273.15).toFixed(0) + ' C';
    document.getElementById('weather-cloudness').innerHTML = 'Clouds: ' + result.clouds.all + '%';
    document.getElementById('weather-humidity').innerHTML = 'Humidity: ' + result.main.humidity + '%';

    console.log(result);
}

xmlhttp.open("GET", request, true);
xmlhttp.send();