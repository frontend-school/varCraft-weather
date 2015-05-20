window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LocationView = (function (exports) {
    var facadeDOM = exports.facadeDOM,
        CONST = exports.CONST;

    function _writeCity(city) {
        facadeDOM.writeInto(CONST.ID.city, city);
    }

    function _writeCountry(country, format) {
        var formattedCountry = format(country);

        facadeDOM.writeInto(CONST.ID.country, formattedCountry);
    }

    function _start(format) {
        exports.pubsub.subscribe('/getGeoData', function (geoData) {
            _writeCity(geoData.city);
            _writeCountry(geoData.country, format);
        });
    }

    return {
        start: _start
    };
}(window.MYAPPLICATION));