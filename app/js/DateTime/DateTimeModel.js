window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

// model
window.VarCraft.modules.DateTimeModel = (function () {
    var CONST = window.VarCraft.CONST;

    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var _currentTime = {},
        _currentDate = {};

    // format time
    var _checkTime = function (item) {
        if (item < 10) {
            item = "0" + item;
        }
        return item;
    }

    var _setTime = function (date) {
        // create an object with all necessary information
        _currentTime = {
            hours: _checkTime(date.getHours() % 12 || 12),
            minutes: _checkTime(date.getMinutes()),
            midday: date.getHours() < 12 ? "AM" : "PM"
        };
        // notify view
        window.modules.pubsub.publish(CONST.ACTION.SET_TIME, _currentTime);
    };

    var _getTime = function () {
        return _currentTime;
    };

    var _setDate = function (date) {
        // create an object with all necessary information
        _currentDate = {
            dayOfWeek: daysOfWeek[date.getDay()],
            month: months[date.getMonth()],
            dayOfMonth: date.getDate()
        };
        // notify view
        window.modules.pubsub.publish(CONST.ACTION.SET_DATE, _currentDate);
    };

    var _getDate = function () {
        return _currentDate;
    };

    return {
        setTime: _setTime,
        getTime: _getTime,
        setDate: _setDate,
        getDate: _getDate
    };
})();