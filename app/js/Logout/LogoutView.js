
(function (namespace) {
    /* View knows about elements: logout button */
    function LogoutView(model, elements) {
        this._model = model;
        this._elements = elements;
    }
    LogoutView.prototype.setHelloMessage = function () {
        var loggingName = this._model.getLoggingName();
        this._elements.halloMessage.innerHTML = 'Hallo, ' + ( (loggingName) ? (loggingName) : ('unnamed') ) + '!';
    };
    LogoutView.prototype.setLoggingName = function () {
        var loggingName = this._model.getLoggingName();
        this._elements.halloMessage.value = loggingName;
    };
    LogoutView.prototype.showLoggingForm = function () {
        var CLASSES_LOGGING = window.vCWeather.CONST.CLASSES_LOGGING;

        window.vCWeather.replaceClassName(CLASSES_LOGGING.TO_HIDE_BLOCK, CLASSES_LOGGING.TO_SHOW_BLOCK);
    };

    namespace.LogoutView = LogoutView;
})(window.vCWeather.modules);