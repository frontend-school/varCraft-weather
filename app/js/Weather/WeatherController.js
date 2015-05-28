window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.WeatherController = (function () {
    var CONST = window.VarCraft.CONST,
        _model = window.VarCraft.modules.WeatherModel,
        _view = window.VarCraft.modules.WeatherView;

    var _weatherSuccess = function (response) {
        // get weather object from JSON
        _model.setWeather(JSON.parse(response).weather);
        var _date = new Date();
        var _dateObj = {};
        // get all dates
        _dateObj.yesterday = new Date((new Date().setDate(_date.getDate() - 1)));
        _dateObj.today = _date;
        _dateObj.tomorrow = new Date((new Date().setDate(_date.getDate() + 1)));
        _model.setDate(_dateObj);
        return true;
    };

    var _weatherError = function () {
        return false;
    };

    // AJAX request
    var _serverRequest = function () {
        var xhr = new window.VarCraft.AJAXRequest('GET', CONST.URL.WEATHER_WEBSERVICE + 'weather', true);
        xhr.send(_weatherSuccess, _weatherError);
    };

    // start module
    var _start = function () {
        _serverRequest();
        _view.start();
    };

    return {
        start: _start
    };
})();

