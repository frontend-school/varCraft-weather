var timerModule = (function () {
    var timeOut = getStayTime(),
        timer = null;
    return {
        startTimer: function () {
            timer = setTimeout(pageModule.reloadPage, timeOut);
        },
        stopTimer: function () {
            clearTimeout(timer);
        },
        restartTimer: function () {
            timerModule.stopTimer();
            timerModule.startTimer();
        }
    };
}());