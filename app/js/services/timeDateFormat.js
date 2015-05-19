window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.timeDateFormat = (function () {
    function time(currentDate) {
        var timeAM = "AM",
            timePM = "PM",
            diem = timeAM,
            hour = currentDate.getHours(),
            minute = currentDate.getMinutes();

        if (hour === 0) {
            hour = 12;
        } else if (hour > 12) {
            hour -= 12;
            diem = timePM;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }

        return {
            getTime: function () {
                return hour + ":" + minute;
            },
            getDiem: function () {
                return diem;
            }
        };
    }

    function _getMonthName(currentDate) {
        var months = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ];
        return months[currentDate.getMonth()];
    }
    function _getDayName(currentDate) {
        var days = [
            'Sun', 'Mon', 'Tue',
            'Wed', 'Thu', 'Fri', 'Sat'
        ];
        return days[currentDate.getDay()];
    }
    return {
        getInfoDate: function (currentDate) {
            var dayName = _getDayName(currentDate),
                month = _getMonthName(currentDate),
                dayValue = currentDate.getDate();

            return dayName + ", " + month + " " + dayValue;
        },
        getWeatherDate: function (currentDate) {
            var dayValue = currentDate.getDate(),
                todayMonth = currentDate.getMonth() + 1,
                todayYear = currentDate.getFullYear();

            if (todayMonth < 10) {
                todayMonth = "0" + todayMonth;
            }

            return dayValue + " / " + todayMonth + " / " + todayYear;
        },
        getTime: function (currentDate) {
            return time(currentDate).getTime();
        },
        getDiem: function (currentDate) {
            return time(currentDate).getDiem();
        }
    };
}());