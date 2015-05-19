window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LocationController = (function (exports) {
    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    function _requestLocation() {
        var res = httpGet("http://ipinfo.io/json"),
            model = exports.LocationModel,
            geoData = {};
        geoData.city = JSON.parse(res).city;
        geoData.country = JSON.parse(res).country;
        model.setGeoData(geoData);
    }
    function _start() {
        exports.LocationView.start();
        _requestLocation();
    }
    return {
        start: _start
    };
}(window.MYAPPLICATION));