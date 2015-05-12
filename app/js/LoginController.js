function LoginController(timer) {
    var _storageController = new StorageController();

    function _startActivityListening(handler) {
        document.addEventListener('mousemove', handler);
        document.addEventListener('keydown', handler);
    }

    function _getLoggingName() {
        var elements = document.getElementsByClassName('js-login-name');
        if (elements.length)
            return elements[0].value;
        return undefined;
    }

    function _setHelloMessage(loggingName) {
        var elements = document.getElementsByClassName('js-hallo-message');
        if (elements.length)
            elements[0].innerHTML = 'Hallo, ' + ( (loggingName) ? (loggingName) : ('unnamed') ) + '!';
    }

    this.logIn = function (ev, skipPreventing, loggedName) {
        var _loggingName = _getLoggingName() || loggedName;
        var CLASSES_LOGGING = window.vCWeather.CONST.CLASSES_LOGGING;

        window.vCWeather.replaceClassName(CLASSES_LOGGING.TO_SHOW_BLOCK, CLASSES_LOGGING.TO_HIDE_BLOCK);
        _setHelloMessage(_loggingName);

        _startActivityListening(timer.processActivityListening);

        timer.startWatchingInactivity();
        _storageController.setLogs(_loggingName, timer.getTimeLeft());

        if (!skipPreventing)
            ev.preventDefault();
    };
}
