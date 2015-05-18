window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LocationModel = (function () {
    var _city = null,
        _country = null;

    return {
        getCity: function () {
            return _city;
        },

        getCountry: function () {
            return _country;
        },

        setGeoData: function (geoData) {
            _city = geoData.city;
            _country = geoData.country;
            window.MYAPPLICATION.pubsub.publish('/getGeoData', geoData);
        }
    };
}());