var weatherModule = (function () {
    return {
        httpGet: function (theUrl) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false);
            xmlHttp.send(null);
            return xmlHttp.responseText;
        },
        getWeather: function (city) {
            var answer = weatherModule.httpGet("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",ua&units=metric&APPID=b04a06714afca79362dec1420563b1e7");

            return answer;
        },
        writeWeather: function () {
            var weatherJSON = weatherModule.getWeather("Kiev"),
                weatherObj = JSON.parse(weatherJSON),
                statusHolder = document.getElementsByClassName("status")[0],
                tempDayHolder = document.getElementsByClassName("temp")[0];

            statusHolder.textContent = weatherObj.weather[0].description.toString();
            tempDayHolder.textContent = Math.round(weatherObj.main.temp);
        }
    };
}())


