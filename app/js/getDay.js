function getDay() {
    (function() {
        var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        Date.prototype.getMonthName = function() {
            return months[ this.getMonth() ];
        };
        Date.prototype.getDayName = function() {
            return days[ this.getDay() ];
        };
    })();

    var currentDate = new Date();

    var dayName = currentDate.getDayName();
    var month = currentDate.getMonthName();
    var dayValue = currentDate.getDate();
    var dayHolder = document.getElementsByClassName("js-info__day")[0];

    dayHolder.textContent =  dayName + ", " + month + " " + dayValue;

    writeDay(currentDate, "js-forecast_today");

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    writeDay(yesterday, "js-forecast_yesterday");

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    writeDay(tomorrow, "js-forecast_tomorrow");
}

function writeDay(currentDate, holder) {
    var dayValue = currentDate.getDate();
    var todayMonth = currentDate.getMonth();
    var todayYear= currentDate.getFullYear();
    var dayHolder = document.getElementsByClassName(holder)[0];

    if (todayMonth < 10) {
        todayMonth = "0" + todayMonth;
    }

    dayHolder.textContent =  dayValue + " / " + todayMonth + " / " + todayYear;
}


