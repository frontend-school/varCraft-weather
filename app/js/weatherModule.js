var weatherModule = (function () {
    return {
        httpGet: function (theUrl) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false);
            xmlHttp.send(null);
            return xmlHttp.responseText;
        },
        getWeather: function (city) {
            var answer = weatherModule.httpGet(api + city + apiOther);

            return answer;
        },
        writeWeather: function () {
            var weatherJSON = weatherModule.getWeather(cityTest),
                weatherObj = JSON.parse(weatherJSON),
                statusHolder = helperModule.getElement(weatherStatus),
                tempDayHolder = helperModule.getElement(weatherTemp);

            statusHolder.textContent = weatherObj.weather[0].description.toString();
            tempDayHolder.textContent = Math.round(weatherObj.main.temp);
        }
    };
}())


