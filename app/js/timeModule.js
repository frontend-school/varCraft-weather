var timeModule = (function () {
    return {
        renderTime: function () {
            var currentTime = new Date(),
                diem = timeAM,
                hour = currentTime.getHours(),
                minute = currentTime.getMinutes(),
                myClock = helperModule.getElement(infoTime),
                diemHolder = helperModule.getElement(infoTimeNotation);

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
                dateModule.writeAllDates();
            }

            myClock.textContent = hour + ":" + minute;
            diemHolder.textContent =  diem;
            setTimeout('timeModule.renderTime()', 1000 * 60);
        }
    };
}());
