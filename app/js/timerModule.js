var timerModule = ( function () {
    var timeOut = getStayTime(),
        timer;
    return {
        startTimer: function () {
            timer = setTimeout(reloadPage, timeOut);
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