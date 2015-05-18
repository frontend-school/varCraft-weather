window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LocationController = (function () {
    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    function requestLocation() {
        var res = httpGet("http://ipinfo.io/json"),
            model = window.MYAPPLICATION.LocationModel,
            geoData = {};
        geoData.city = JSON.parse(res).city;
        geoData.country = JSON.parse(res).country;
        model.setGeoData(geoData);
    }
    return {
        start: function () {
            window.MYAPPLICATION.LocationView.start();
            requestLocation();
        }
    };
}());