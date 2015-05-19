window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateView = (function (exports) {
    var helperModule = exports.helperModule,
        CONST = exports.CONST,
        timeDateFormat = exports.timeDateFormat;

    //write info time
    function _writeTime(currentDate) {
        helperModule.writeInto(CONST.ID.infoTime, timeDateFormat.getTime(currentDate));
        helperModule.writeInto(CONST.ID.infoTimeNotation, timeDateFormat.getDiem(currentDate));
    }

    function _writeInfoDate(currentDate) {
        helperModule.writeInto(CONST.ID.infoDay, timeDateFormat.getInfoDate(currentDate));
    }
    //****
    //write weather day (remove to weather)
    function _writeDay(currentDate, holder) {
        helperModule.writeInto(holder, timeDateFormat.getWeatherDate(currentDate));
    }

    function _writeTomorrow(currentDate) {
        currentDate.setDate(currentDate.getDate() + 1);
        _writeDay(currentDate, CONST.ID.forecastTomorrow);
    }

    function _writeYesterday(currentDate) {
        currentDate.setDate(currentDate.getDate() - 2);
        _writeDay(currentDate, CONST.ID.forecastYesterday);
    }

    function _writeWeatherDates(currentDate) {
        _writeDay(currentDate, CONST.ID.forecastToday);
        _writeTomorrow(currentDate);
        _writeYesterday(currentDate);
    }

    //**
    function _start() {
        exports.pubsub.subscribe('/timeChange', function (date) {
            _writeTime(date);
        });
        exports.pubsub.subscribe('/dateChange', function (date) {
            _writeInfoDate(date);
            _writeWeatherDates(date); //move to weather
        });
    }
    return {
        start: _start
    };
}(window.MYAPPLICATION));
