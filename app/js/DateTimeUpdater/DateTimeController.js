
window.vCWeather = window.vCWeather || {};
window.vCWeather.modules = window.vCWeather.modules || {};

(function (namespace) {

    function DateTimeUpdaterController(model, view) {
        this._model = model;
    }
    DateTimeUpdaterController.prototype = {
        init: function () {
            this._model.init();
        }
    };

    namespace.DateTimeUpdaterController = DateTimeUpdaterController;
})(window.vCWeather.modules);
