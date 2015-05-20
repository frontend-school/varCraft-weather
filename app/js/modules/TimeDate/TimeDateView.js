window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateView = (function (exports) {
    var facadeDOM = exports.facadeDOM,
        CONST = exports.CONST,
        infoTime = CONST.ID.infoTime,
        infoTimeNotation = CONST.ID.infoTimeNotation,
        infoDay = CONST.ID.infoDay,
        forecastTomorrow = CONST.ID.forecastTomorrow,//move to weather
        forecastYesterday = CONST.ID.forecastYesterday,
        forecastToday = CONST.ID.forecastToday;

    //write info time
    function _writeTime(currentDate, format) {
        var time = format(currentDate);

        facadeDOM.writeInto(infoTime, time);
    }

    function _writeDiem(currentDate, format) {
        var diem = format(currentDate);

        facadeDOM.writeInto(infoTimeNotation, diem);
    }

    function _writeInfoTime(currentDate, formatTime, formatDiem) {
        _writeTime(currentDate, formatTime);
        _writeDiem(currentDate, formatDiem);
    }

    function _writeInfoDate(currentDate, formatDate) {
        var date = formatDate(currentDate);

        facadeDOM.writeInto(infoDay, date);
    }
    //****
    //write weather day (remove to weather)
    function _writeDay(currentDate, holder, format) {
        var date = format(currentDate);

        facadeDOM.writeInto(holder, date);
    }

    function _writeTomorrow(currentDate, formatWeatherDate) {
        currentDate.setDate(currentDate.getDate() + 1);
        _writeDay(currentDate, forecastTomorrow, formatWeatherDate);
    }

    function _writeYesterday(currentDate, formatWeatherDate) {
        currentDate.setDate(currentDate.getDate() - 2);
        _writeDay(currentDate, forecastYesterday, formatWeatherDate);
    }

    function _writeWeatherDates(currentDate, formatWeatherDate) {
        _writeDay(currentDate, forecastToday, formatWeatherDate);
        _writeTomorrow(currentDate, formatWeatherDate);
        _writeYesterday(currentDate, formatWeatherDate);
    }

    //**
    function _start(formatTime, formatDiem, formatDate, formatWeatherDate) {
        exports.pubsub.subscribe('/timeChange', function (date) {
            _writeInfoTime(date, formatTime, formatDiem);
        });
        exports.pubsub.subscribe('/dateChange', function (date) {
            _writeInfoDate(date, formatDate);
            _writeWeatherDates(date, formatWeatherDate); //move to weather
        });
    }

    return {
        start: _start
    };
}(window.MYAPPLICATION));
