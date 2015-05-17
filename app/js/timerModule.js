window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.timerModule = (function () {
    var TIME_OUT = window.MYAPPLICATION.CONST.stayTime,
        timer = null;
    function _startTimer(callback) {
        timer = setTimeout(callback, TIME_OUT);
    }
    function _stopTimer() {
        clearTimeout(timer);
    }
    return {
        restartTimer: function (callback) {
            _stopTimer();
            _startTimer(callback);
        }
    };
}());