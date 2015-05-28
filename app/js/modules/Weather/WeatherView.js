window.varCraft = window.varCraft || {};
window.varCraft.weatherView =  window.varCraft.weatherView || {};

window.varCraft.weatherView = (function(namespace){
    function init(){
        var yesterday = {}, today = {}, tomorrow = {};

        yesterday.forecast = namespace.dom.getElem(namespace.CONST.yesterday.forecast);
        yesterday.forecastDate = namespace.dom.getElem(namespace.CONST.yesterday.forecastDate);
        yesterday.forecastDescription = namespace.dom.getElem(namespace.CONST.yesterday.forecastDescription);
        yesterday.forecastDayTemp = namespace.dom.getElem(namespace.CONST.yesterday.forecastDayTemp);
        yesterday.forecastNightTemp = namespace.dom.getElem(namespace.CONST.yesterday.forecastNightTemp);
        yesterday.forecastHumidity = namespace.dom.getElem(namespace.CONST.yesterday.forecastHumidity);
        yesterday.forecastHumidityTitle = namespace.dom.getElem(namespace.CONST.yesterday.forecastHumidityTitle);
        yesterday.forecastWind = namespace.dom.getElem(namespace.CONST.yesterday.forecastWind);
        yesterday.forecastWindSpeed = namespace.dom.getElem(namespace.CONST.yesterday.forecastWindSpeed);
        yesterday.forecastWindDirection = namespace.dom.getElem(namespace.CONST.yesterday.forecastWindDirection);
        yesterday.forecastMoon = namespace.dom.getElem(namespace.CONST.yesterday.forecastMoon);

        today.forecast = namespace.dom.getElem(namespace.CONST.today.forecast);
        today.forecastDate = namespace.dom.getElem(namespace.CONST.today.forecastDate);
        today.forecastDescription = namespace.dom.getElem(namespace.CONST.today.forecastDescription);
        today.forecastDayTemp = namespace.dom.getElem(namespace.CONST.today.forecastDayTemp);
        today.forecastNightTemp = namespace.dom.getElem(namespace.CONST.today.forecastNightTemp);
        today.forecastHumidity = namespace.dom.getElem(namespace.CONST.today.forecastHumidity);
        today.forecastHumidityTitle = namespace.dom.getElem(namespace.CONST.today.forecastHumidityTitle);
        today.forecastWind = namespace.dom.getElem(namespace.CONST.today.forecastWind);
        today.forecastWindSpeed = namespace.dom.getElem(namespace.CONST.today.forecastWindSpeed);
        today.forecastWindDirection = namespace.dom.getElem(namespace.CONST.today.forecastWindDirection);
        today.forecastMoon = namespace.dom.getElem(namespace.CONST.today.forecastMoon);

        tomorrow.forecast = namespace.dom.getElem(namespace.CONST.tomorrow.forecast);
        tomorrow.forecastDate = namespace.dom.getElem(namespace.CONST.tomorrow.forecastDate);
        tomorrow.forecastDescription = namespace.dom.getElem(namespace.CONST.tomorrow.forecastDescription);
        tomorrow.forecastDayTemp = namespace.dom.getElem(namespace.CONST.tomorrow.forecastDayTemp);
        tomorrow.forecastNightTemp = namespace.dom.getElem(namespace.CONST.tomorrow.forecastNightTemp);
        tomorrow.forecastHumidity = namespace.dom.getElem(namespace.CONST.tomorrow.forecastHumidity);
        tomorrow.forecastHumidityTitle = namespace.dom.getElem(namespace.CONST.tomorrow.forecastHumidityTitle);
        tomorrow.forecastWind = namespace.dom.getElem(namespace.CONST.tomorrow.forecastWind);
        tomorrow.forecastWindSpeed = namespace.dom.getElem(namespace.CONST.tomorrow.forecastWindSpeed);
        tomorrow.forecastWindDirection = namespace.dom.getElem(namespace.CONST.tomorrow.forecastWindDirection);
        tomorrow.forecastMoon = namespace.dom.getElem(namespace.CONST.tomorrow.forecastMoon);



        var weatherConditions = {
            "Sun" : "forecast_sun",
            "Downpour": "forecast_downpour",
            "Mostly Cloudy": "forecast_mostly-cloudy",
            "Partly Cloudy": "forecast_partly-cloudy",
            "Rain and Sun": "forecast_rain-and-sun",
            "Light Rain": "forecast_light-rain",
            "Rain": "forecast_rain",
            "Snow":"forecast_snow",
            "Snow Fall": "forecast_snow-fall",
            "Sleet": "forecast_sleet",
            "Fog": "forecast_fog"
        };

        var windDirections = {
            n: "forecast-extra-info__wind_n",
            ne:"forecast-extra-info__wind_ne",
            e: "forecast-extra-info__wind_e",
            se: "forecast-extra-info__wind_se",
            s: "forecast-extra-info__wind_s",
            sw: "forecast-extra-info__wind_sw",
            w: "forecast-extra-info__wind_w",
            nw:"forecast-extra-info__wind_nw"
        };

        var humidity = ["forecast-extra-info_humidity-1","forecast-extra-info_humidity-2", "forecast-extra-info_humidity-3"];

        function fillForecast(when, newForecast){
            namespace.dom.substituteClass(when.forecast, namespace.CONST.regExps.forecast, weatherConditions[newForecast.weatherCondition]);
            when.forecastDate.innerHTML = newForecast.date;
            when.forecastDescription.innerHTML = newForecast.weatherCondition;
            when.forecastDayTemp.innerHTML = newForecast.temperatureAtDay;
            when.forecastNightTemp.innerHTML = newForecast.temperatureAtNight;
            console.log(when.forecast.className);
            namespace.dom.substituteClass(when.forecastWind, namespace.CONST.regExps.wind, windDirections[newForecast.windDirection]);
            console.log("[wind :]",when.forecastWind);
            when.forecastWindSpeed.innerHTML = newForecast.windSpeed;
            when.forecastWindDirection.innerHTML = newForecast.windDirection;
            namespace.dom.substituteClass(when.forecastHumidity, namespace.CONST.regExps.humidity, humidity[newForecast.humidity]);
            when.forecastHumidityTitle.innerHTML = newForecast.humidityTitle;
            console.log(newForecast.humidityTitle);
        }

        this.refreshForecast = function(day, newForecast){
            if(day == "yesterday"){
                fillForecast(yesterday, newForecast);
            }

            if(day == "today"){
                fillForecast(today, newForecast);
            }

            if(day == "tomorrow"){
                fillForecast(tomorrow, newForecast);
            }

        };
    }
    return {
        _init: init
    };

})(window.varCraft);
