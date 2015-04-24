//= dashboardModule.js
//= formModule.js
//= cookieModule.js
//= weatherModule.js
//= timeModule.js
//= dateModule.js
//= timerModule.js
//= pageModule.js
function getStayTime() {
    var stayTime = 30 * 60 * 1000;
    return stayTime;
}

document.onload = (function () {
    var userName = cookieModule.readCookie("testCookie");
    timeModule.renderTime();
    dateModule.writeAllDates();
    //weatherModule.writeWeather();//for api working example
    document.getElementById("submit-button").addEventListener('click', pageModule.logIn);
    document.getElementById("log-out-button").addEventListener('click', pageModule.logOut);
    if (userName) {
        cookieModule.writeCookie('testCookie', userName, getStayTime());
        dashboardModule.showDashboard(userName);
        timerModule.restartTimer();
    } else {
        formModule.showForm();
    }
})()