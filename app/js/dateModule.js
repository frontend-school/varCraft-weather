window.MYAPPLICATION.dateModule = (function () {
    (function () {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        Date.prototype.getMonthName = function () {
            return months[this.getMonth()];
        };
        Date.prototype.getDayName = function () {
            return days[this.getDay()];
        };
    }) ();
    function _writeDay(currentDate, holder) {
        var dayValue = currentDate.getDate(),
            todayMonth = currentDate.getMonth() + 1,
            todayYear = currentDate.getFullYear(),
            dayHolder = MYAPPLICATION.helperModule.getElement(holder);

        if (todayMonth < 10) {
            todayMonth = "0" + todayMonth;
        }

        dayHolder.textContent = dayValue + " / " + todayMonth + " / " + todayYear;
    }
    function _writeTomorrow(currentDate) {
        currentDate.setDate(currentDate.getDate() + 1);
        _writeDay(currentDate, MYAPPLICATION.CONST.ID.forecastTomorrow);
    }
    function _writeYesterday(currentDate) {
        currentDate.setDate(currentDate.getDate() - 2);
        _writeDay(currentDate, MYAPPLICATION.CONST.ID.forecastYesterday);
    }
    function _writeWeatherDates(currentDate) {
        _writeDay(currentDate, MYAPPLICATION.CONST.ID.forecastToday);
        _writeTomorrow(currentDate);
        _writeYesterday(currentDate);
    }
    function _writeInfoDate(currentDate) {
        var dayName = currentDate.getDayName(),
            month = currentDate.getMonthName(),
            dayValue = currentDate.getDate(),
            dayHolder = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.infoDay);

        dayHolder.textContent =  dayName + ", " + month + " " + dayValue;
    }
    return {
        writeAllDates: function () {
            var currentDate = new Date();
            _writeInfoDate(currentDate);
            _writeWeatherDates(currentDate);
        }
    };
}());











