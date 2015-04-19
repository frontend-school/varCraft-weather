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

    var dayHolder = document.getElementById("info__day");
    dayHolder.textContent =  dayName + ", " + month + " " + dayValue;
    dayHolder.innerText =  dayName + ", " + month + " " + dayValue;

    writeDay(currentDate, "daily-forecast__date_today");

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    writeDay(yesterday, "daily-forecast__date_yesterday");

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    writeDay(tomorrow, "daily-forecast__date_tomorrow");
}

function writeDay(currentDate, holder) {
    console.log("dd");
    var dayValue = currentDate.getDate();
    var todayMonth = currentDate.getMonth();
    var todayYear= currentDate.getFullYear();
    if (todayMonth < 10) {
        todayMonth = "0" + todayMonth;
    }

    console.log(dayValue);
    console.log(todayMonth);
    console.log(todayYear);

    var dayHolder = document.getElementById(holder);
    dayHolder.textContent =  dayValue + "/" + todayMonth + "/" + todayYear;
    dayHolder.innerText =  dayValue + "/" + todayMonth + "/" + todayYear;
}

getDay();


