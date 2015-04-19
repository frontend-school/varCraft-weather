function renderTime() {

    var currentTime = new Date();
    var diem = "AM";
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();

    if (hour == 0)  {
        hour = 12;
    }	else if (hour > 12)	{
        hour -= 12;
        diem = "PM"
    }
    if (minute < 10)	{
        minute = "0" + minute;
    }

    if (diem == "AM" && hour == 0 && minute == 0) {
        getDay();
    }
    var myClock = document.getElementById('clockDisplay');
    myClock.textContent = hour + ":" + minute;
    myClock.innerText = hour + ":" + minute;
    var diemHolder = document.getElementById("diem");
    diemHolder.textContent =  diem;
    diemHolder.innerText =  diem;
    setTimeout('renderTime()',1000);
}