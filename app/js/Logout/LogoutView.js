
(function (namespace) {
    var CONST = window.vCWeather.CONST;

    /* View knows about elements: logout button */
    function LogoutView(model, elements) {
        this._model = model;
        this._elements = elements;
    }
    LogoutView.prototype.setHelloMessage = function () {
        var loggedName = this._model.getLoggedName();
        this._elements.login.halloMessage.innerHTML = 'Hallo, ' +
            ( (loggedName) ? (loggedName) : ('unnamed') ) +
            '!';
    };
    LogoutView.prototype.showLoggedName = function () {
        this._elements.login.loggingName.value = this._model.getLoggedName();
    };
    LogoutView.prototype.showLoggingForm = function () {
        var CLASSES_LOGGING = window.vCWeather.CONST.CLASSES_LOGGING;

        window.vCWeather.replaceClassName(CONST.CLASSES_LOGGING.TO_HIDE_BLOCK, CONST.CLASSES_LOGGING.TO_SHOW_BLOCK);
    };

    namespace.LogoutView = LogoutView;
})(window.vCWeather.modules);