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
            MYAPPLICATION.cookieModule.writeCookie(MYAPPLICATION.CONST.cookieName, MYAPPLICATION.cookieModule.readCookie(MYAPPLICATION.CONST.cookieName), MYAPPLICATION.CONST.stayTime);
            startTimer();
        }
    };
}());