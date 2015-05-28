
(function (namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;

    function WeatherModel() {
        this._weatherData = [];

        this.weatherDataChanged = new modules.Event();
    }

    WeatherModel.prototype = {
        setWeatherData: function (weatherData) {
            this._weatherData = weatherData;

            this.weatherDataChanged.notify({weatherData: this._weatherData});
        },
        getWeatherData: function () {
            return this._weatherData;
        }
    };

    modules.WeatherModel = WeatherModel;
})(window.vCWeather);