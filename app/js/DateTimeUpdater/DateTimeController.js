
(function (namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;

    var pubsub = namespace.objects.pubsub;

    function DateTimeUpdaterController(model, view) {
        this._model = model;
        this._intervalId = undefined;

        var self = this;
        pubsub.subscribe('userLoggedIn', function () {
            self.init();
        });
        pubsub.subscribe('userLoggedOut', function () {
            self.stop();
        });
    }
    DateTimeUpdaterController.prototype = {
        init: function () {
            this._model.setDate();
            this._model.dayChanged.notify({date: this._model.getDate()});

            var self = this;
            this._intervalId = setInterval(function () {
                self._model.setDate();
            }, CONST.ONE_MINUTE_MS - this._model._date.getSeconds() * 1000);
        },
        stop: function () {
            clearInterval(this._intervalId);
        }
    };

    modules.DateTimeUpdaterController = DateTimeUpdaterController;
})(window.vCWeather);
