
(function (namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;

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
        var CLASSES_LOGGING = CONST.CLASSES_LOGGING;

        window.vCWeather.replaceClassName(CLASSES_LOGGING.TO_HIDE_BLOCK, CLASSES_LOGGING.TO_SHOW_BLOCK);
    };

    modules.LogoutView = LogoutView;
})(window.vCWeather);