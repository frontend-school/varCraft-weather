//api - 788362a84fe3647e4bc964823a588f45
if(username) {
    setTimeout(function(){
        window.location.href = 'http://' + window.location.host;
    }, 1800100);

    var request = 'http://api.openweathermap.org/data/2.5/weather?q=Kiev,ua';//&APPID=788362a84fe3647e4bc964823a588f45';
    var result = {};
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            result = JSON.parse(xmlhttp.responseText);
            write();
        }
    };

    function write() {
        document.getElementById('weather-city').innerHTML = 'Current weather in ' + result.name + ':';
        document.getElementById('weather-temperature').innerHTML = 'Temperature: ' + (+result.main.temp - 273.15).toFixed(0) + ' C';
        document.getElementById('weather-cloudness').innerHTML = 'Clouds: ' + result.clouds.all + '%';
        document.getElementById('weather-humidity').innerHTML = 'Humidity: ' + result.main.humidity + '%';

        console.log(result);
    }

    xmlhttp.open("GET", request, true);
    xmlhttp.send();
}