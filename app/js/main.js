window.MYAPPLICATION = window.MYAPPLICATION || {};

//= constants.js
//= helperModule.js
//= dashboardModule.js
//= formModule.js
//= cookieModule.js
//= weatherModule.js
//= timeModule.js
//= dateModule.js
//= timerModule.js
//= pageModule.js
//= eventModule.js

document.onload = (function () {
    var userName = MYAPPLICATION.cookieModule.readCookie(MYAPPLICATION.CONST.cookieName);
    MYAPPLICATION.timeModule.renderTime();
    MYAPPLICATION.dateModule.writeAllDates();
    //weatherModule.writeWeather();//for api working example
    MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.submitButton).addEventListener('click', MYAPPLICATION.pageModule.logIn);
    MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.logOutButton).addEventListener('click', MYAPPLICATION.pageModule.logOut);
    MYAPPLICATION.eventModule.startEventModule();
    if (userName) {
        MYAPPLICATION.cookieModule.writeCookie(MYAPPLICATION.CONST.cookieName, userName, MYAPPLICATION.CONST.stayTime);
        MYAPPLICATION.dashboardModule.showDashboard(userName);
        MYAPPLICATION.timerModule.restartTimer();
    } else {
        MYAPPLICATION.formModule.showForm();
    }
})()