function mainDateTimeView() {
    var dt = MainDateTimeModel.getDateTime();
    var hours = dt.hours;
    var minutes = dt.minutes;
    minutes = (minutes < 10)
        ? '0' + minutes
        : minutes;
    var ampm = dt.ampm;
    var date = dt.date;
    var middayElement = document.getElementsByClassName('info__datetime_time_midday')[0];
    middayElement.innerHTML = ampm;
    document.getElementsByClassName('info__datetime_time')[0].innerHTML = hours + ':' + minutes;
    document.getElementsByClassName('info__datetime_time')[0].appendChild(middayElement);
    document.getElementsByClassName('info__datetime_date')[0].innerHTML = date;
}