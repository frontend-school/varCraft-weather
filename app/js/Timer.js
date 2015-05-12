function Timer() {
    var CONST = window.vCWeather.CONST.TIMER;

    var _self = this;
    var _timerOffId;

    var _timeOffLimit = CONST.TIME_OFF_LIMIT;
    var _timeDeltaOff = CONST.TIME_DELTA_OFF;
    var _timeLeft = _timeOffLimit;

    var _enabledActivityListening = true;

    var _storageController = new StorageController();
    var _logoutController;

    function _resetTimeLeft() {
        _timeLeft = _timeOffLimit;
    }

    // in case when timeLeft is off, logging out will be executed
    function _updateInactiveTimeLeft() {
        if (_timeLeft >= _timeDeltaOff) {
            _timeLeft = _timeLeft - _timeDeltaOff;
            // restore handler, which can be removed if an activity was
            _enabledActivityListening = true;
            // Write in sessionStorage
            _storageController.setEndIfInactivityAt(_timeLeft);
        } else {

            _self.stopWatchingInactivity();
            _logoutController.logOut(null, true);
            _logoutController.stopActivityListening(this.processActivityListening);

        }
    }

    /////////////// Interface //////////////

    this.setLogoutController = function (logoutController) {
        _logoutController = logoutController;
    };

    this.startWatchingInactivity = function () {
        // Start timer back
        _timerOffId = setInterval(_updateInactiveTimeLeft, _timeDeltaOff);
        /*setInterval()*/
    };

    this.stopWatchingInactivity = function () {
        clearInterval(_timerOffId);
        _enabledActivityListening = false;
        _resetTimeLeft();
    };

    this.processActivityListening = function () {
        if (_enabledActivityListening) {
            _resetTimeLeft();
            _enabledActivityListening = false;
        }
    };

    this.getTimeLeft = function () {
        return _timeLeft;
    };
}
