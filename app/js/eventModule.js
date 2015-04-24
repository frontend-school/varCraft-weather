var eventModule = (function () {
    function resetEvent() {
        document.onmousemove = null;
        document.onkeydown = null;
    }

    function onEvent() {
        timerModule.restartTimer();
        resetEvent();
    }
    function addMouseEvent() {
        document.addEventListener("mousemove", onEvent);
    }
    function addKeyEvent() {
        document.addEventListener("keydown", onEvent);
    }
    return {
        startEventModule : function () {
            addMouseEvent();
            addKeyEvent();
        }
    }

} ());