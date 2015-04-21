//= dashboard.js
//= form.js
//= cookie.js
//= writeWeather.js
//= renderTime
//= getDay.js
function getStayTime() {
    var stayTime = 30 * 60 * 1000;
    return stayTime;
}

function logIn() {
    var userName = document.getElementById("name").value;

    if (userName === "" ||  document.getElementById("password").value === "") {
        return;
    }
    //add simple validation
    hideForm();
    writeCookie('testCookie', userName, getStayTime());
    greating(userName);

    clearForm();
    isInactive();
}

function logOut() {
    eraseCookie('testCookie');
    hideDashboard();
    showForm();
}

function isInactive() {
    var timeOut = getStayTime();
    var timer;

    function startTimer() {
        timer = setTimeout(reloadPage, timeOut);
    }

    function stopTimer() {
        clearTimeout(timer);
    }

    stopTimer();
    startTimer();
}

function reloadPage() {
    eraseCookie('testCookie');
    hideDashboard();
    showForm();
}

document.onload = (function () {
    renderTime();
    getDay();
    //writeWeather();//for api working example
    var userName = readCookie("testCookie");
    document.getElementById("submit-button").addEventListener('click', logIn);
    document.getElementById("log-out-button").addEventListener('click', logOut);
    if (userName) {
        writeCookie('testCookie', userName, getStayTime());
        greating(userName);
        isInactive();
    } else {
        showForm();
    }
})()