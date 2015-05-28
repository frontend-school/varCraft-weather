(function(namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;
    var services = namespace.services;

    var pubsub = namespace.objects.pubsub;

    var self;
    function WeatherController(model, view) {
        self = this;

        this._model = model;
        this._view = view;

        view.humidityChanged.attach(function () {
            var params = arguments[0],
                humidityValue = parseInt(params.value, 10);

            var humidityLevel = 'low';
            if (humidityValue > 45) {
                if (humidityValue <= 85) {
                    humidityLevel = 'medium';
                } else {
                    humidityLevel = 'high';
                }
            }

            services.updateClassModificator(params.element, params.collection[humidityLevel], params.collection);
        });
        view.statusChanged.attach(function () {
            var params = arguments[0];
            services.updateClassModificator(params.element, params.collection[params.value], params.collection);
        });
        view.windDirectionChanged.attach(function () {
            var params = arguments[0];
            services.updateClassModificator(params.element, params.collection[params.value], params.collection);
        });
        view.moonPhaseChanged.attach(function () {
            var params = arguments[0];
            services.updateClassModificator(params.element, params.collection[params.value], params.collection);
        });

        pubsub.subscribe('userLoggedIn', function () {
            self.init();
        });
    }
    WeatherController.prototype.init = function () {
        services.sendRequestToServer(CONST.SERVER.ADDRESS + '/weather', {}, function (respText) {
            var weatherObj = JSON.parse(respText);

            self._model.setWeatherData(weatherObj);
            self.showWeather();
        });
    };
    WeatherController.prototype.showWeather = function () {
        var view = this._view,
            daysInOrder = ['yesterday', 'today', 'tomorrow'],
            weatherData = this._model.getWeatherData(),
            c1,
            dayKey,
            dayData;
        for (c1 = 0; c1 < daysInOrder.length; c1++) {
            dayKey = daysInOrder[c1];
            dayData = weatherData[c1];

            view.showHeader(dayKey, 'Kiev');
            view.showDate(dayKey, new Date(dayData.dateTimeISO));
            view.showDayTemperature(dayKey, dayData.avgTempDayC);
            view.showNightTemperature(dayKey, dayData.avgTempNightC);

            view.showWeatherStatus(dayKey, dayData.weather);

            view.showHumidity(dayKey, dayData.humidity+'%');
            view.showWindSpeed(dayKey, dayData.windSpeedMPH + ' ' + CONST.WEATHER.WIND_SPEED_SCALE);
            view.showWindDirection(dayKey, dayData.windDirMax);
            view.showMoonPhase(dayKey, dayData.moonPhaseName);
        }
    };

    modules.WeatherController = WeatherController;
})(window.vCWeather);