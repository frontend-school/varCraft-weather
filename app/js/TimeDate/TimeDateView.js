window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateView = (function () {
    var helperModule = window.MYAPPLICATION.helperModule,
        CONST = window.MYAPPLICATION.CONST,
        timeDateFormat = window.MYAPPLICATION.timeDateFormat;

    //write info time
    function _writeTime(currentDate) {
        var myClock = helperModule.getElement(CONST.ID.infoTime),
            diemHolder = helperModule.getElement(CONST.ID.infoTimeNotation);

        myClock.textContent = timeDateFormat.getTime(currentDate);
        diemHolder.textContent =  timeDateFormat.getDiem(currentDate);
    }

    function _writeInfoDate(currentDate) {
        var dayHolder = helperModule.getElement(CONST.ID.infoDay);

        dayHolder.textContent =  timeDateFormat.getInfoDate(currentDate);
    }
    //****
    //write weather day (remove to weather)
    function _writeDay(currentDate, holder) {
        var dayHolder = helperModule.getElement(holder);

        dayHolder.textContent = timeDateFormat.getWeatherDate(currentDate);
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

    return {
        start: function() {
            var model = window.MYAPPLICATION.TimeDateModel,
                currentDate = model.getDate();

            _writeInfoDate(currentDate);
            _writeWeatherDates(currentDate); //move to weather

            window.MYAPPLICATION.pubsub.subscribe('/timeChange', function (date) {
                _writeTime(date);
            });
            window.MYAPPLICATION.pubsub.subscribe('/dateChange', function (date) {
                _writeInfoDate(date);
                _writeWeatherDates(date); //move to weather
            });
        }
    };
}());
