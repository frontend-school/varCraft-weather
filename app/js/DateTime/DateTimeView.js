window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

// view
window.VarCraft.modules.DateTimeView = (function () {
    var CONST = window.VarCraft.CONST;

    var _start = function () {
        // change view after changing model (every minute)
        window.modules.pubsub.subscribe(CONST.ACTION.SET_TIME, function (time) {
            document.querySelector(CONST.SELECTORS.TIME).innerHTML = time.hours + ":" + time.minutes;
            document.querySelector(CONST.SELECTORS.MIDDAY).innerHTML = time.midday;
        });

        // (every day)
        window.modules.pubsub.subscribe(CONST.ACTION.SET_DATE, function (date) {
            document.querySelector(CONST.SELECTORS.DATE).innerHTML = date.dayOfWeek + " " + date.month + " " + date.dayOfMonth;
        });
    };

    return {
        start: _start
    };

})();
