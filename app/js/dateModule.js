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
    return {
        writeDay: function (currentDate, holder) {
            var dayValue = currentDate.getDate(),
                todayMonth = currentDate.getMonth() + 1,
                todayYear = currentDate.getFullYear(),
                dayHolder = MYAPPLICATION.helperModule.getElement(holder);

            if (todayMonth < 10) {
                todayMonth = "0" + todayMonth;
            }

            dayHolder.textContent = dayValue + " / " + todayMonth + " / " + todayYear;
        },
        writeTomorrow: function (currentDate) {
            currentDate.setDate(currentDate.getDate() + 1);
            MYAPPLICATION.dateModule.writeDay(currentDate, MYAPPLICATION.CONST.ID.forecastTomorrow);
        },
        writeYesterday: function (currentDate) {
            currentDate.setDate(currentDate.getDate() - 2);
            MYAPPLICATION.dateModule.writeDay(currentDate, MYAPPLICATION.CONST.ID.forecastYesterday);
        },
        writeWeatherDates: function (currentDate) {
            MYAPPLICATION.dateModule.writeDay(currentDate, MYAPPLICATION.CONST.ID.forecastToday);
            MYAPPLICATION.dateModule.writeTomorrow(currentDate);
            MYAPPLICATION.dateModule.writeYesterday(currentDate);
        },
        writeInfoDate: function (currentDate) {
            var dayName = currentDate.getDayName(),
                month = currentDate.getMonthName(),
                dayValue = currentDate.getDate(),
                dayHolder = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.infoDay);

            dayHolder.textContent =  dayName + ", " + month + " " + dayValue;
        },
        writeAllDates: function () {
            var currentDate = new Date();
            MYAPPLICATION.dateModule.writeInfoDate(currentDate);
            MYAPPLICATION.dateModule.writeWeatherDates(currentDate);
        }
    };
}());











