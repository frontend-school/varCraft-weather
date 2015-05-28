
(function(namespace) {
    var modules = namespace.modules;
    var services = namespace.services;
    var CONST = namespace.CONST;
    var WEATHER = CONST.WEATHER;

    var CLASSES_DAY_LIST = CONST.WEATHER.CLASSES_DAY_LIST;
    var CLASSES_WEATHER_DATA = CONST.WEATHER.CLASSES_WEATHER_DATA;

    var classesDayList = {
        yesterday: CLASSES_DAY_LIST.DAY_YESTERDAY,
        today: CLASSES_DAY_LIST.DAY_TODAY,
        tomorrow: CLASSES_DAY_LIST.DAY_TOMORROW
    };
    var classesWeatherData = {
        header: CLASSES_WEATHER_DATA.DAY_HEADER,
        date: CLASSES_WEATHER_DATA.DAY_DATE,
        dayTemperature: CLASSES_WEATHER_DATA.TEMPERATURE_DAY,
        nightTemperature: CLASSES_WEATHER_DATA.TEMPERATURE_NIGHT,
        status: CLASSES_WEATHER_DATA.STATUS,
        humidityScheme: CLASSES_WEATHER_DATA.HUMIDITY_SCHEME,
        humidity: CLASSES_WEATHER_DATA.HUMIDITY_VALUE,
        windSpeed: CLASSES_WEATHER_DATA.WIND_SPEED,
        windDirection: CLASSES_WEATHER_DATA.WIND_DIRECTION,
        windScheme: CLASSES_WEATHER_DATA.WIND_SCHEME,
        moonScheme: CLASSES_WEATHER_DATA.MOON_SCHEME
    };

    function WeatherView(model) {

        this._model = model;

        this._elements = services.getElementsTree(classesDayList, classesWeatherData);

        this.humidityChanged = new modules.Event();
        this.statusChanged = new modules.Event();
        this.windDirectionChanged = new modules.Event();
        this.moonPhaseChanged = new modules.Event();
    }

/*
    WeatherView.prototype.showOnYesterday = function (data, showFunc) {
        this.showFunc('today', data);
    };
    WeatherView.prototype.showOnToday = function (data, showFunc) {
        this.showFunc('today', data);
    };
    WeatherView.prototype.showOnTomorrow = function (data, showFunc) {
        this.showFunc('tomorrow', data);
    };
*/

    WeatherView.prototype._showData = function (dayKey, dataKey, value) {
        this._elements[dayKey][dataKey].innerHTML = value;
    };

    WeatherView.prototype.showHeader = function (dayKey, city) {
        var headerText;
        switch (dayKey) {
            case 'yesterday':
                headerText = 'Yesterday in ';
                break;
            case 'today':
                headerText = 'Today in ';
                break;
            case 'tomorrow':
                headerText = 'Tomorrow in ';
                break;
            default:
                headerText = 'In ';
        }
        headerText = headerText + city;

        this._showData(dayKey, 'header', headerText);
    };
    WeatherView.prototype.showDate = function (dayKey, date) {
        var formattedDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
        this._showData(dayKey, 'date', formattedDate);
    };
    WeatherView.prototype.showDayTemperature = function (dayKey, temperature) {
        this._showData(dayKey, 'dayTemperature', temperature);
    };
    WeatherView.prototype.showNightTemperature = function (dayKey, temperature) {
        this._showData(dayKey, 'nightTemperature', temperature);
    };

    WeatherView.prototype.showWeatherStatus = function (dayKey, status) {
        this._showData(dayKey, 'status', status);

        var element = this._elements[dayKey].status;
        this.statusChanged.notify({element: element, value: status, collection: WEATHER.CLASSES_WEATHER_STATUS_MODIFICATORS});

        this.statusChanged.notify({element: document.querySelector(classesDayList[dayKey]),
            value: status, collection: WEATHER.CLASSES_DAY_COLOR_MODIFICATORS});
    };
    WeatherView.prototype.showHumidity = function (dayKey, humidity) {
        this._showData(dayKey, 'humidity', humidity);

        var element = this._elements[dayKey].humidityScheme;
        this.humidityChanged.notify({element: element, value: humidity, collection: WEATHER.CLASSES_HUMIDITY_MODIFICATORS});
    };
    WeatherView.prototype.showWindSpeed = function (dayKey, windSpeed) {
        this._showData(dayKey, 'windSpeed', windSpeed);
    };
    WeatherView.prototype.showWindDirection = function (dayKey, windDirection) {
        this._showData(dayKey, 'windDirection', windDirection);

        var element = this._elements[dayKey].windScheme;
        this.windDirectionChanged.notify({element: element, value: windDirection, collection: WEATHER.CLASSES_WIND_DIRECTION_MODIFICATORS});
    };
    WeatherView.prototype.showMoonPhase = function (dayKey, moonPhase) {
        var element = this._elements[dayKey].moonScheme;
        this.moonPhaseChanged.notify({element: element, value: moonPhase, collection: WEATHER.CLASSES_MOON_MODIFICATORS});
    };

    modules.WeatherView = WeatherView;
})(window.vCWeather);