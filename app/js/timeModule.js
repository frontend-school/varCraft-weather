MYAPPLICATION.timeModule = (function () {
    var timeAM = "AM",
        timePM = "PM";

    function timeCount () {
        var currentTime = new Date(),
            diem = timeAM,
            hour = currentTime.getHours(),
            minute = currentTime.getMinutes(),
            myClock = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.infoTime),
            diemHolder = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.infoTimeNotation);

        if (hour === 0) {
            hour = 12;
        } else if (hour > 12) {
            hour -= 12;
            diem = timePM;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }

        if (diem === timeAM && hour === 0 && minute === 0) {
            MYAPPLICATION.CONST.dateModule.writeAllDates();
        }

        myClock.textContent = hour + ":" + minute;
        diemHolder.textContent =  diem;
        setTimeout('MYAPPLICATION.timeModule.renderTime()', 1000 * 60);
    }

    return {
        renderTime : function () {
            timeCount();
        }
    };
}());
