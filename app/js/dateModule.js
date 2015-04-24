var dateModule = (function () {
    (function () {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        Date.prototype.getMonthName = function () {
            return months[this.getMonth()];
        };
        Date.prototype.getDayName = function () {
            return days[this.getDay()];
        };
    })();
    return {
        writeDay: function (currentDate, holder) {
            var dayValue = currentDate.getDate(),
                todayMonth = currentDate.getMonth() + 1,
                todayYear = currentDate.getFullYear(),
                dayHolder = document.getElementsByClassName(holder)[0];

            if (todayMonth < 10) {
                todayMonth = "0" + todayMonth;
            }

            dayHolder.textContent = dayValue + " / " + todayMonth + " / " + todayYear;
        },
        writeTomorrow: function (currentDate) {
            currentDate.setDate(currentDate.getDate() + 1);
            dateModule.writeDay(currentDate, "js-forecast_tomorrow");
        },
        writeYesterday: function (currentDate) {
            currentDate.setDate(currentDate.getDate() - 2);
            dateModule.writeDay(currentDate, "js-forecast_yesterday");
        },
        writeWeatherDates: function (currentDate) {
            dateModule.writeDay(currentDate, "js-forecast_today");
            dateModule.writeTomorrow(currentDate);
            dateModule.writeYesterday(currentDate);
        },
        writeInfoDate: function (currentDate) {
            var dayName = currentDate.getDayName(),
                month = currentDate.getMonthName(),
                dayValue = currentDate.getDate(),
                dayHolder = document.getElementsByClassName("js-info__day")[0];

            dayHolder.textContent =  dayName + ", " + month + " " + dayValue;
        },
        writeAllDates: function () {
            var currentDate = new Date();
            dateModule.writeInfoDate(currentDate);
            dateModule.writeWeatherDates(currentDate);
        }
    };
}());











