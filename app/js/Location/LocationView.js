window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LocationView = (function () {
    var helperModule = window.MYAPPLICATION.helperModule,
        CONST = window.MYAPPLICATION.CONST;

    function _writeCity(city) {
        helperModule.getElement(CONST.ID.city).textContent = city;
    }

    function _writeCountry(country) {
        var format = window.MYAPPLICATION.countryFormat;
        helperModule.getElement(CONST.ID.country).textContent = format.getCountryName(country);
    }

    return {
        start: function () {
            window.MYAPPLICATION.pubsub.subscribe('/getGeoData', function (geoData) {
                _writeCity(geoData.city);
                _writeCountry(geoData.country);
            });
        }
    };
}());