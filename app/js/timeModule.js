MYAPPLICATION.timeModule = (function () {
    return {
        renderTime: function () {
            var currentTime = new Date(),
                diem = MYAPPLICATION.CONST.timeAM,
                hour = currentTime.getHours(),
                minute = currentTime.getMinutes(),
                myClock = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.infoTime),
                diemHolder = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.infoTimeNotation);

            if (hour === 0) {
                hour = 12;
            } else if (hour > 12) {
                hour -= 12;
                diem = MYAPPLICATION.CONST.timePM;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }

            if (diem === MYAPPLICATION.CONST.timeAM && hour === 0 && minute === 0) {
                MYAPPLICATION.CONST.dateModule.writeAllDates();
            }

            myClock.textContent = hour + ":" + minute;
            diemHolder.textContent =  diem;
            setTimeout('MYAPPLICATION.timeModule.renderTime()', 1000 * 60);
        }
    };
}());
