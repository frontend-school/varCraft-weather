window.MYAPPLICATION.weatherModule = (function () {
    return {
        httpGet: function (theUrl) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false);
            xmlHttp.send(null);
            return xmlHttp.responseText;
        },
        getWeather: function (city) {
            var answer = MYAPPLICATION.weatherModule.httpGet(MYAPPLICATION.CONST.api + city + MYAPPLICATION.CONST.apiOther);

            return answer;
        },
        writeWeather: function () {
            var weatherJSON = MYAPPLICATION.weatherModule.getWeather(MYAPPLICATION.CONST.cityTest),
                weatherObj = JSON.parse(weatherJSON),
                statusHolder = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.weatherStatus),
                tempDayHolder = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.weatherTemp);

            statusHolder.textContent = weatherObj.weather[0].description.toString();
            tempDayHolder.textContent = Math.round(weatherObj.main.temp);
        }
    };
}())


