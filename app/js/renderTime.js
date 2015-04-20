function renderTime() {

    var currentTime = new Date();
    var diem = "AM";
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var myClock = document.getElementsByClassName('js-info__time-value')[0];
    var diemHolder = document.getElementsByClassName("js-info__time-notation")[0];

    if (hour == 0)  {
        hour = 12;
    }	else if (hour > 12)	{
        hour -= 12;
        diem = "PM";
    }
    if (minute < 10)	{
        minute = "0" + minute;
    }

    if (diem == "AM" && hour == 0 && minute == 0) {
        getDay();
    }

    myClock.textContent = hour + ":" + minute;
    diemHolder.textContent =  diem;
    setTimeout('renderTime()',1000);
}