window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LocationView = (function (exports) {
    var helperModule = exports.helperModule,
        CONST = exports.CONST;

    function _writeCity(city) {
        helperModule.getElement(CONST.ID.city).textContent = city;
    }

    function _writeCountry(country) {
        var format = exports.countryFormat;
        helperModule.getElement(CONST.ID.country).textContent = format.getCountryName(country);
    }

    return {
        start: function () {
            exports.pubsub.subscribe('/getGeoData', function (geoData) {
                _writeCity(geoData.city);
                _writeCountry(geoData.country);
            });
        }
    };
}(window.MYAPPLICATION));