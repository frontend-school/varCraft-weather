var timerModule = (function () {
    var timeOut = getStayTime(),
        timer = null;
    function startTimer() {
        timer = setTimeout(pageModule.reloadPage, timeOut);
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