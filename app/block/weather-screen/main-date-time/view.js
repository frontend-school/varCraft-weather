function mainDateTimeView() {
    var dt = new Date(subscribe('datetime'));
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    minutes = (minutes < 10)
        ? '0' + minutes
        : minutes;
    var ampm = (hours >= 12)
        ? 'PM'
        : 'AM';
    hours = (hours > 12)
        ? hours - 12
        : hours;
    var date = dt.toDateString();

    var middayElement = document.getElementsByClassName('info__datetime_time_midday')[0];
    middayElement.innerHTML = ampm;
    document.getElementsByClassName('info__datetime_time')[0].innerHTML = hours + ':' + minutes;
    document.getElementsByClassName('info__datetime_time')[0].appendChild(middayElement);
    document.getElementsByClassName('info__datetime_date')[0].innerHTML = date;
}