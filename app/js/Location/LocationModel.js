
(function(namespace) {
    var modules = namespace.modules;

    function LocationModel() {
        this._locationParams = {
            city: '',
            country: ''
        };
    }
    LocationModel.prototype.setParams = function (locationParams) {
        for (var key in this._locationParams) {
            this._locationParams[key] = locationParams[key];
        }
    };
    LocationModel.prototype.getParams = function () {
        return this._locationParams;
    };

    modules.LocationModel = LocationModel;
})(window.vCWeather);