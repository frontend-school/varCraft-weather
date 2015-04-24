//= dashboard.js
//= formModule.js
//= cookieModule.js
//= writeWeather.js
//= renderTime.js
//= dateModule.js
//= timerModule.js
function getStayTime() {
    var stayTime = 15 * 1000//30 * 60 * 1000;
    return stayTime;
}

function logIn() {
    var userName = document.getElementById("name").value;

    if (userName === "" ||  document.getElementById("password").value === "") {
        return;
    }
    //add simple validation
    formModule.hideForm();
    cookieModule.writeCookie('testCookie', userName, getStayTime());
    dashboardModule.showDashboard(userName);
    formModule.clearForm();
    timerModule.startTimer();
}

function logOut() {
    cookieModule.eraseCookie('testCookie');
    timerModule.stopTimer();
    dashboardModule.hideDashboard();
    formModule.showForm();
}

function reloadPage() {
    cookieModule.eraseCookie('testCookie');
    dashboardModule.hideDashboard();
    formModule.showForm();
}

document.onload = (function () {
    var userName = cookieModule.readCookie("testCookie");
    renderTime();
    dateModule.writeAllDates();
    //writeWeather();//for api working example
    document.getElementById("submit-button").addEventListener('click', logIn);
    document.getElementById("log-out-button").addEventListener('click', logOut);
    if (userName) {
        cookieModule.writeCookie('testCookie', userName, getStayTime());
        dashboardModule.showDashboard(userName);
        timerModule.restartTimer();
    } else {
        formModule.showForm();
    }
})()