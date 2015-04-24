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
function getStayTime() {
    var stayTime = 10*1000//30 * 60 * 1000;
    return stayTime;
}

document.onload = (function () {
    var userName = cookieModule.readCookie(cookieName);
    timeModule.renderTime();
    dateModule.writeAllDates();
    //weatherModule.writeWeather();//for api working example
    helperModule.getElement(submitButton).addEventListener(action, pageModule.logIn);
    helperModule.getElement(logOutButton).addEventListener(action, pageModule.logOut);
    eventModule.startEventModule();
    if (userName) {
        cookieModule.writeCookie(cookieName, userName, getStayTime());
        dashboardModule.showDashboard(userName);
        timerModule.restartTimer();
    } else {
        formModule.showForm();
    }
})()