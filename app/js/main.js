function logIn() {
    var userName = document.getElementById("name").value;

    if (userName == "" ||  document.getElementById("password").value=="") {
        return;
    }
    //add simple validation
    hideForm();
    writeCookie('testCookie', userName, 30);
    greating(userName);
    clearForm();
    isInactive();
}

function logOut() {
    eraceCookie('testCookie');
    hideDashboard();
    showForm();

}

function hideForm() {
    document.getElementById("popup__overlay").className = document.getElementById("popup__overlay").className.replace
        ( /(?:^|\s)popup__overlay_active(?!\S)/g , '' );
    document.getElementById("popup__overlay").className += " popup__overlay_hidden";
}

function hideDashboard(){
    document.getElementById("hello").innerHTML = "";
    document.getElementById("dashboard").className = document.getElementById("dashboard").className.replace
    ( /(?:^|\s)b-dashboard_active(?!\S)/g , '' );
    document.getElementById("dashboard").className += " b-dashboard_hidden";
}

function showForm() {
    hideDashboard();
    document.getElementById("popup__overlay").className = document.getElementById("popup__overlay").className.replace
        ( /(?:^|\s)popup__overlay_hidden(?!\S)/g , '' );
    document.getElementById("popup__overlay").className += " popup__overlay_active";
}

function greating(name) {
    document.getElementById("hello").innerHTML = "Hello " + name;

    document.getElementById("dashboard").className = document.getElementById("dashboard").className.replace
    ( /(?:^|\s)b-dashboard_hidden(?!\S)/g , '' );
    document.getElementById("dashboard").className += " b-dashboard_active";
}

function clearForm() {
    document.getElementsByClassName("login-form")[0].reset();
}


function isInactive() {
    var timeOut = 30 * 60 * 1000;//30 min
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
    eraceCookie('testCookie');
    showForm();
}

function writeCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24  *60  *60 *1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var searchName = name + "=";
    var cookie = document.cookie.split(';');

    for ( var i = 0; i < cookie.length; i++) {
        var c = cookie[i];

        while(c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(searchName) == 0) {
            return c.substring(searchName.length, c.length);
        }
    }

    return null;
}

function eraceCookie(name) {
    writeCookie(name, "", -1);
}

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getweather(city) {
   var answer = httpGet("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",ua&units=metric&APPID=b04a06714afca79362dec1420563b1e7");

    return answer;
}

function writeSomething(){
    var weatherJSON = getweather("Kiev");
    console.log(weatherJSON);

    var weatherObj = JSON.parse(weatherJSON);
    console.log(weatherObj);


    document.getElementById("demo").innerHTML = weatherObj.weather[0].description.toString();
}

document.onload = (function () {
    var userName = readCookie("testCookie");
    document.getElementById("submit-button").addEventListener( 'click' , logIn );
    document.getElementById("log-out-button").addEventListener( 'click' , logOut );
    if (userName) {
        writeCookie('testCookie', userName, 30);
        greating(userName);
        isInactive();
    } else {
        showForm();
    }
})()