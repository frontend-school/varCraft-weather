(function dateTime(){
    function Model(){
        var hours;
        var minutes;
        var ampm;
        var date;

        this.setDateTime = function setDateTime(unixTime){
            var dateTime = new Date(unixTime);
            hours = dateTime.getHours();
            minutes = dateTime.getMinutes();
            ampm = (hours >= 12)
                ? 'PM'
                : 'AM';
            hours = (hours > 12)
                ? hours - 12
                : hours;
            date = dateTime.toDateString();
        };

        this.getDateTime = function getDateTime(){
            return {
                hours: hours,
                minutes: minutes,
                ampm: ampm,
                date: date
            }
        };
    }
    var model = new Model();

    (function controller(){
        model.setDateTime(new Date().getTime());
        setTimeout(controller, 1000);
    })();

    (function view(){
        var dt = model.getDateTime();
        var hours = dt.hours;
        var minutes = dt.minutes;
        var ampm = dt.ampm;
        var date = dt.date;
        document.getElementsByClassName('info__datetime_time')[0].innerHTML = hours + ':' + minutes +
            '\<div class="info__datetime_time_midday"\>' + ampm + '\</div>';
        document.getElementsByClassName('info__datetime_date')[0].innerHTML = date;
        setTimeout(view, 1000);
    })();
})();