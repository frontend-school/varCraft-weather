window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LocationController = (function (exports) {
    var view = exports.LocationView,
        request = exports.facadeRequest,
        locationApiUrl = "http://ipinfo.io/json";

    function _requestLocation() {
        var model = exports.LocationModel,
            geoData = {},
            xmlHttp = new XMLHttpRequest();

        xmlHttp.onload = function () {
            res = xmlHttp.responseText;
            geoData.city = JSON.parse(res).city;
            geoData.country = JSON.parse(res).country;
            model.setGeoData(geoData);
        };

        xmlHttp.open("GET", locationApiUrl, true);
        xmlHttp.send(null);
    }

    function _start(format) {
        view.start(format);
        _requestLocation();
    }

    return {
        start: _start
    };
}(window.MYAPPLICATION));