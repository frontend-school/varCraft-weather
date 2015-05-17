window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.eventModule = (function () {
    function _resetEvent() {
        document.onmousemove = null;
        document.onkeydown = null;
    }

    function _onEvent() {
        window.MYAPPLICATION.pubsub.publish('/active', {});
        _resetEvent();
    }

    function _addMouseEvent() {
        document.addEventListener("mousemove", _onEvent);
    }

    function _addKeyEvent() {
        document.addEventListener("keydown", _onEvent);
    }

    return {
        startEventModule : function () {
            _addMouseEvent();
            _addKeyEvent();
        }
    };
}());