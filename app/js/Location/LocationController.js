window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.LocationController = (function () {
    var CONST = window.VarCraft.CONST,
        _model = window.VarCraft.modules.LocationModel,
        _view = window.VarCraft.modules.LocationView,
        _city, _country;

    var _locationSuccess = function (res) {
        var _loc = JSON.parse(res);
        _city = _loc.city;
        _country = _loc.country;
        _model.setLocation(_city, _country);
        return true;
    };

    var _locationError = function () {
        return false;
    };

    // AJAX request
    var _serverRequest = function () {
        var xhr = new window.VarCraft.AJAXRequest('GET', CONST.URL.LOCATION_WEBSERVICE, true);
        xhr.setGetParams();
        xhr.send(_locationSuccess, _locationError);
    };


    var _start = function () {
        _view.start();
        _serverRequest();

    };

    return {
        start: _start
    };
})();


