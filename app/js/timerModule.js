MYAPPLICATION.timerModule = (function () {
    var timeOut = MYAPPLICATION.CONST.stayTime,
        timer = null;
    function startTimer() {
        timer = setTimeout(MYAPPLICATION.pageModule.reloadPage, timeOut);
    }
    function stopTimer() {
        clearTimeout(timer);
    }
    return {
        restartTimer: function () {
            stopTimer();
            startTimer();
        }
    };
}());