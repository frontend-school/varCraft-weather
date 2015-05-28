window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.WeatherModel = (function () {
    var CONST = window.VarCraft.CONST,
        _weather = {},
        _date = {};

    var _setWeather = function (weatherObj) {
        _weather = weatherObj;
        // notify view
        window.modules.pubsub.publish(CONST.ACTION.SET_WEATHER, _weather);
    };

    var _getWeather = function () {
        return _weather;
    };

    var _buildDate = function (date) {
        var _days = [];
        for (var key in date) {
            if (!date.hasOwnProperty(key)) {
                continue;
            }
            // build dates array (yesterday, today, tomorrow)
            _days.push({
                day: window.VarCraft.DateTimeFormat.checkDateTime(date[key].getDate()),
                month: window.VarCraft.DateTimeFormat.checkDateTime(date[key].getMonth()),
                year: date[key].getFullYear()
            });
        }
        return _days;
    };

    var _setDate = function (date) {
        _date = _buildDate(date);
        // notify view
        window.modules.pubsub.publish(CONST.ACTION.SET_WEATHER_DATE, _date);
    };

    var _getDate = function () {
        return _date;
    };

    return {
        setWeather: _setWeather,
        getWeather: _getWeather,
        setDate: _setDate,
        getDate: _getDate
    };
})();


