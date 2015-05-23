
(function(namespace) {
    var modules = namespace.modules;

    function LocationView(model, elements) {
        this._model = model;
        this._elements = elements;
    }

    LocationView.prototype.showLocation = function () {
        var locationParams = this._model.getParams();

        this._elements.city.innerHTML = locationParams.city;
        this._elements.country.innerHTML = locationParams.country;
    };

    modules.LocationView = LocationView;
})(window.vCWeather);