
(function(namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;
    var services = namespace.services;

    var pubsub = namespace.objects.pubsub;

    var self;
    function LocationController(model, view) {
        self = this;

        this._model = model;
        this._view = view;

        pubsub.subscribe('userLoggedIn', function () {
            self.init();
        });
    }
    LocationController.prototype.init = function () {
        services.sendRequestToServer(CONST.LOCATION_SERVICE_ADDR, {}, function (respText) {
            var locationObj = JSON.parse(respText);

            self._model.setParams(locationObj);
            self._view.showLocation();
        });
    };

    modules.LocationController = LocationController;
})(window.vCWeather);