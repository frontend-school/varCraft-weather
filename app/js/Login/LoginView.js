
(function (namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;

    function LoginView(model, elements) {
        this._model = model;
        this._elements = elements;

        /*var self = this;
        this._model.loggingNameChanged.attach(function () {
            self.setHelloMessage();
        });*/
    }
    LoginView.prototype.hideLoggingForm = function () {
        var CLASSES_LOGGING = CONST.CLASSES_LOGGING;

        window.vCWeather.replaceClassName(CLASSES_LOGGING.TO_SHOW_BLOCK, CLASSES_LOGGING.TO_HIDE_BLOCK);
    };

    modules.LoginView = LoginView;
})(window.vCWeather);