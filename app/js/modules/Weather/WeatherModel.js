window.varCraft = window.varCraft || {};
window.varCraft.weatherModel =  window.varCraft.weatherModel || {};

window.varCraft.weatherModel = (function(nameSpace){
    var forecast = {};
    forecast.yesterday = {};
    forecast.today = {};
    forecast.tomorrow = {};
    forecast.yesterday.date = "--/ -- / ----";
    forecast.yesterday.weaterCondition = "";
    forecast.yesterday.temperatureAtDay = "";
    forecast.yesterday.temperatureAtNight = "";
    forecast.yesterday.windSpeed = "";
    forecast.yesterday.windDirection = "";
    forecast.yesterday.moonPhase = "";


    return {
        setWeather: function(day, newForecast){
            if(forecast[day] && typeof newForecast === "object"){
                forecast[day].date = newForecast.date;
                forecast[day].date = newForecast;
                forecast[day].weaterCondition = newForecast.weaterCondition;
                forecast[day].temperatureAtDay = newForecast.temperatureAtDay;
                forecast[day].temperatureAtNight = newForecast.temperatureAtNight;
                forecast[day].windSpeed = newForecast.windSpeed;
                forecast[day].windDirection = newForecast.windDirection;
                forecast[day].moonPhase = newForecast.moonPhase;
            }
        },
        getWeather: function(day){
            if(forecast[day]){
                return forecast[day];
            }
        }
    };
})(window.varCraft);
