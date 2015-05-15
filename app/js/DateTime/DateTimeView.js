window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

// view
window.VarCraft.modules.DateTimeView = (function () {
    var CONST = window.VarCraft.CONST,
        timeElement = document.querySelector(CONST.SELECTORS.TIME),
        middayElement = document.querySelector(CONST.SELECTORS.MIDDAY),
        dateElement = document.querySelector(CONST.SELECTORS.DATE);

    // set time
    var _setTime = function (time) {
        timeElement.innerHTML = time.hours + ":" + time.minutes;
        middayElement.innerHTML = time.midday;
    };

    // set date
    var _setDate = function (date) {
        dateElement.innerHTML = date.dayOfWeek + ". " + date.month + " " + date.dayOfMonth;
    };

    var _start = function () {
        // change view after changing model (every minute)
        window.modules.pubsub.subscribe(CONST.ACTION.SET_TIME, _setTime);

        // (every day)
        window.modules.pubsub.subscribe(CONST.ACTION.SET_DATE, _setDate);
    };

    return {
        start: _start
    };

})();
