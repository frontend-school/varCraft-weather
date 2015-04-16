/**
 * Created by Oleksandra_Abramova on 3/31/2015.
 */
function logIn() {
    var userName = document.getElementById("name").value;

    if (userName == "" ||  document.getElementById("password").value=="") {
        return;
    }
    //simple validation
    document.getElementsByClassName("popup__overlay")[0].style.display = 'none';
    writeCookie('testCookie', userName, 30);
    // cookie = new cookie;
    greating(userName);
    clearForm();
    isInactive();
}

function greating(name) {
    //do normal block
    document.getElementById("hello").innerHTML = "Hello " + name;
}

function clearForm() {
    document.getElementsByClassName("login-form")[0].reset();
}


function isInactive() {
    var timeOut =  30 * 60 * 1000;//30 min
    var timer;

    function startTimer() {
        timer = setTimeout(showForm, timeOut);
    }

    function stopTimer() {
        clearTimeout(timer);
    }

    stopTimer();
    startTimer();
}


function showForm() {
    eraceCookie('testCookie');
    document.getElementsByClassName("popup__overlay")[0].style.display = 'block';
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

document.onload = (function () {
    var userName = readCookie("testCookie");
    document.getElementById("submit-button").addEventListener( 'click' , logIn );
    if (userName) {
        greating(userName);
        isInactive();
    } else {
        showForm();
    }
})()