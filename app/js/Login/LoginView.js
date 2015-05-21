
(function (namespace) {
    /* View knows about elements: login form, name field, password field, hallo message */
    function LoginView(model, elements) {
        this._model = model;
        this._elements = elements;

        var self = this;
        this._model.loggingNameChanged.attach(function () {
            self.setHelloMessage();
        });
    }
    LoginView.prototype.setHelloMessage = function () {
        var loggingName = this._model.getLoggingName();
        this._elements.login.halloMessage.innerHTML = 'Hallo, ' + ( (loggingName) ? (loggingName) : ('unnamed') ) + '!';
    };
    LoginView.prototype.setLoggingName = function () {
        var loggingName = this._model.getLoggingName();
        this._elements.login.halloMessage.value = loggingName;
    };
    LoginView.prototype.hideLoggingForm = function () {
        var CLASSES_LOGGING = window.vCWeather.CONST.CLASSES_LOGGING;

        window.vCWeather.replaceClassName(CLASSES_LOGGING.TO_SHOW_BLOCK, CLASSES_LOGGING.TO_HIDE_BLOCK);
    };

    namespace.LoginView = LoginView;
})(window.vCWeather.modules);