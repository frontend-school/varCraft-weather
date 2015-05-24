window.varCraft = window.varCraft || {};
window.varCraft.weatherController =  window.varCraft.weatherController || {};

window.varCraft.weatherController = (function(namespace){
	function start(){
		namespace.weatherView._init();

        var newForecast1 = {}, newForecast2 = {}, newForecast3 = {};

        // function MakeForecast(){
        //     this.date = "24 / 05 / 2015";
        //     this.weatherCondition = "Sun";
        //     this.temperatureAtDay = "+15";
        //     this.temperatureAtNight = "+13";
        //     this.windSpeed = "17mph";
        //     this.windDirection = "se";
        //     this.moonPhase = 2;
        //     this.humidity = 2;
        //     this.humidityTitle = "60%";
        // }

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



		this.changeForecast = function(){
                namespace.weatherModel.setWeather("yesterday", newForecast1);
				namespace.weatherView.refreshForecast("yesterday", namespace.weatherModel.getWeather("yesterday"));

                namespace.weatherModel.setWeather("today", newForecast2);
                namespace.weatherView.refreshForecast("today", namespace.weatherModel.getWeather("today"));

                namespace.weatherModel.setWeather("tomorrow", newForecast3);
                namespace.weatherView.refreshForecast("tomorrow", namespace.weatherModel.getWeather("tomorrow"));

		};

	};

    return {
        _start: start
    }
})(window.varCraft);