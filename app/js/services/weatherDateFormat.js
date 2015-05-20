window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.weatherDateFormat = (function () {
     function _weatherDateFormat(currentDate) {
        var dayValue = currentDate.getDate(),
            todayMonth = currentDate.getMonth() + 1,
            todayYear = currentDate.getFullYear();

        if (todayMonth < 10) {
            todayMonth = "0" + todayMonth;
        }

        return dayValue + " / " + todayMonth + " / " + todayYear;
    }

    return {
        format: _weatherDateFormat
    };
}());