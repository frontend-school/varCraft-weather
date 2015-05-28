window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.WeatherView = (function () {
    var CONST = window.VarCraft.CONST,
        _yesterday = document.querySelector(CONST.SELECTORS.YESTERDAY),
        _today = document.querySelector(CONST.SELECTORS.TODAY),
        _tomorrow = document.querySelector(CONST.SELECTORS.TOMORROW),
        // icons classes
        _condIcon = CONST.SELECTORS.WEATHER_CONDITION_ICON,
        _moonIcon = CONST.SELECTORS.MOON_ICON,
        _windDirection = CONST.SELECTORS.WIND_DIRECTION;

    var _days = [_yesterday, _today ,_tomorrow];

    // map for finding necessary classes of weather condition
    var _weatherMap = {
        "Snow fall": {
            "background": "column_snow-fall",
            "condition": "column-data__condition-icon_snow-fall"
        },
        "Fog": {
            "background": "column_fog",
            "condition": "column-data__condition-icon_fog"
        },
        "Downpour": {
            "background": "column_downpour",
            "condition": "column-data__condition-icon_downpour"
        },
        "Mostly cloudy": {
            "background": "column_mostly-cloudy",
            "condition": "column-data__condition-icon_mostly-cloudy"
        },
        "Sunny": {
            "background": "column_sunny",
            "condition": "column-data__condition-icon_sunny"
        },
        "Sleet": {
            "background": "column_sleet",
            "condition": "column-data__condition-icon_sleet"
        },
        "Snow": {
            "background": "column_snow",
            "condition": "column-data__condition-icon_snow"
        },
        "rain": {
            "background": "column_light-rain",
            "condition": "column-data__condition-icon_light-rain"
        },
        "Rain and sun": {
            "background": "column_rain-and-sun",
            "condition": "column-data__condition-icon_rain-and-sun"
        }
    };

    // map for finding necessary classes of moon
    var _moonMap = {
        "full": "column-data-other-moon__icon_full",
        "new": "column-data-other-moon__icon_new",
        "first quater": "column-data-other-moon__icon_first-quater",
        "third quater": "column-data-other-moon__icon_third-quater",
        "waxing crescent": "column-data-other-moon__icon_waxing-crescent",
        "waxing gibbous": "column-data-other-moon__icon_waxing-gibbous",
        "waning crescent": "column-data-other-moon__icon_waning-crescent",
        "waning gibbous": "column-data-other-moon__icon_waning-gibbous"
    };

    // map for finding necessary classes of wind
    var _windMap = {
        "N": "column-data-other-wind__direction_N",
        "NW": "column-data-other-wind__direction_NW",
        "W": "column-data-other-wind__direction_W",
        "SW": "column-data-other-wind__direction_SW",
        "S": "column-data-other-wind__direction_S",
        "SE": "column-data-other-wind__direction_SE",
        "E": "column-data-other-wind__direction_E",
        "NE": "column-data-other-wind__direction_NE"
    };

    // build column body
    var _buildHTML = function (day, weather) {
        // background
        day.className+= " " +_weatherMap[weather.periods.weather].background;
        // weather items
        day.querySelector(_condIcon).className =_condIcon.replace(".", "") + " " + _weatherMap[weather.periods.weather].condition+ " ";
        day.querySelector(CONST.SELECTORS.WEATHER_CONDITION_TITLE).innerHTML = weather.periods.weather;
        day.querySelector(CONST.SELECTORS.DAY_TEMP).innerHTML = weather.periods.avgTempC;
        day.querySelector(CONST.SELECTORS.NIGHT_TEMP).innerHTML = weather.periods.nightTempC;
        day.querySelector(CONST.SELECTORS.HUMIDITY).innerHTML = weather.periods.humidity + "%";
        day.querySelector(CONST.SELECTORS.MOON_ICON).className = _moonIcon.replace(".", "") +" " + _moonMap[weather.phase.name];
        day.querySelector(CONST.SELECTORS.WIND_VALUE).innerHTML = weather.periods.windSpeedMPH + " mph";
        day.querySelector(CONST.SELECTORS.WIND_DIRECTION).className = _windDirection.replace(".", "") +" " +_windMap[weather.periods.windDirMax];
        day.querySelector(CONST.SELECTORS.WIND_LABEL).innerHTML = weather.periods.windDirMax;
    };

    // build column header
    var _addDate = function (day, date) {
        day.querySelector(CONST.SELECTORS.WEATHER_DAY).innerHTML = date.day+ " / " + date.month + " / " + date.year;
    };

    // functions for producing all 3 days
    var _build = function (obj, callback) {
        var i = 0;
        // call callback for each day
        _days.forEach(function (elem) {
            callback(elem, obj[i++]);
        });
    };

    // for column body
    var _setWeather = function (weather) {
        _build(weather, _buildHTML);
    };

    // for column header
    var _setDate = function (date) {
        _build(date, _addDate);
    };

    // start module (add subscribers)
    var _start = function () {
        window.modules.pubsub.subscribe(CONST.ACTION.SET_WEATHER, _setWeather);
        window.modules.pubsub.subscribe(CONST.ACTION.SET_WEATHER_DATE, _setDate);
    };

    return {
        start: _start
    };
})();

