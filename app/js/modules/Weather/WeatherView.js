window.varCraft = window.varCraft || {};
window.varCraft.weatherView =  window.varCraft.weatherView || {};

window.varCraft.weatherView = (function(namespace){
    function init(){
        var yesterday = {}, today = {}, tomorrow = {};

        yesterday.forecast = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastField);
        yesterday.forecastDate = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastDateField);
        yesterday.forecastDescription = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastDescriptionField);
        yesterday.forecastDayTemp = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastDayTempField);
        yesterday.forecastNightTemp = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastNightTempField);
        yesterday.forecastHumidity = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastHumidityField);
        yesterday.forecastHumidityTitle = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastHumidityTitleField);
        yesterday.forecastWind = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastWindField);
        yesterday.forecastWindSpeed = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastWindSpeedField);
        yesterday.forecastWindDirection = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastWindDirectionField);
        yesterday.forecastMoon = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.yesterday.forecastMoonField);

        today.forecast = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastField);
        today.forecastDate = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastDateField);
        today.forecastDescription = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastDescriptionField);
        today.forecastDayTemp = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastDayTempField);
        today.forecastNightTemp = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastNightTempField);
        today.forecastHumidity = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastHumidityField);
        today.forecastHumidityTitle = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastHumidityTitleField);
        today.forecastWind = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastWindField);
        today.forecastWindSpeed = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastWindSpeedField);
        today.forecastWindDirection = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastWindDirectionField);
        today.forecastMoon = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.today.forecastMoonField);

        tomorrow.forecast = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastField);
        tomorrow.forecastDate = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastDateField);
        tomorrow.forecastDescription = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastDescriptionField);
        tomorrow.forecastDayTemp = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastDayTempField);
        tomorrow.forecastNightTemp = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastNightTempField);
        tomorrow.forecastHumidity = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastHumidityField);
        tomorrow.forecastHumidityTitle = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastHumidityTitleField);
        tomorrow.forecastWind = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastWindField);
        tomorrow.forecastWindSpeed = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastWindSpeedField);
        tomorrow.forecastWindDirection = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastWindDirectionField);
        tomorrow.forecastMoon = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.tomorrow.forecastMoonField);



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
            when.forecast.className = when.forecast.className.replace(namespace.CONSTANTS.regExps.forecast, weatherConditions[newForecast.weatherCondition] + " ");  
            when.forecastDate.innerHTML = newForecast.date;
            when.forecastDescription.innerHTML = newForecast.weatherCondition;
            when.forecastDayTemp.innerHTML = newForecast.temperatureAtDay;
            when.forecastNightTemp.innerHTML = newForecast.temperatureAtNight;
            console.log(when.forecast.className);
            when.forecastWind.className = when.forecastWind.className.replace(namespace.CONSTANTS.regExps.wind, windDirections[newForecast.windDirection] + " ");
            when.forecastWindSpeed.innerHTML = newForecast.windSpeed;
            when.forecastWindDirection.innerHTML = newForecast.windDirection;
            when.forecastHumidity.className = when.forecastHumidity.className.replace(namespace.CONSTANTS.regExps.humidity, humidity[newForecast.humidity] + " ");
            when.forecastHumidityTitle.innerHTML = newForecast.humidityTitle;
            console.log(newForecast.humidityTitle);
        }

        this.refreshForecast = function(day, newForecast){
            if(day == "yesterday"){
                fillForecast(yesterday, newForecast);
            };

            if(day == "today"){
                fillForecast(today, newForecast);
            };

            if(day == "tomorrow"){
                fillForecast(tomorrow, newForecast);
            };

        };
    }
    return {
        _init: init
    };

})(window.varCraft);
