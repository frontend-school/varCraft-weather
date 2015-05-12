window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

// model
window.VarCraft.modules.DateTimeModel = (function () {
    var CONST = window.VarCraft.CONST;

    var daysOfWeek = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var date = new Date();

    function checkTime(item) {
        if (item < 10) {
            item = "0" + item;
        }
        return item;
    }

    var _getTime = function (date) {
        // create an object with all necessary information
        return {
            hours: checkTime(date.getHours() % 12 || 12),
            minutes: checkTime(date.getMinutes()),
            midday: date.getHours() < 12 ? "AM" : "PM"
        };
    };

    var _getDate = function (date) {
        // create an object with all necessary information
        return {
            dayOfWeek: daysOfWeek[date.getDay()],
            month: months[date.getMonth()],
            dayOfMonth: date.getDate()
        };
    };

    var _start = function () {
        // view after page load
        window.modules.pubsub.publish(CONST.ACTION.SET_TIME, _getTime(date));
        window.modules.pubsub.publish(CONST.ACTION.SET_DATE, _getDate(date));


        setTimeout(function () {
            date = new Date();
            // view after the end of the current minute
            window.modules.pubsub.publish(CONST.ACTION.SET_TIME, _getTime(date));

            setInterval(function () {
                date = new Date();
                // view each one minute
                window.modules.pubsub.publish(CONST.ACTION.SET_TIME, _getTime(date));

            }, 1000 * 60);

        }, (60 - date.getSeconds()) * 1000);

        setTimeout(function () {
            date = new Date();
            // view after the end of the current day
            window.modules.pubsub.publish(CONST.ACTION.SET_DATE, _getDate(date));

            setInterval(function () {
                date = new Date();
                // view each one day
                window.modules.pubsub.publish(CONST.ACTION.SET_DATE, _getDate(date));
            }, 24 * 60 * 60 * 1000);

        }, (24 - date.getHours()) * 60 * 60 * 1000);
    };

    return {
        start: _start
    };
})();


