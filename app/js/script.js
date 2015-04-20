var login = (function () {
    var _logIn,
        _logInWrapper,
        _logOut,
        _cookieLifeTime = 30*60,
        _userName,
        _userNameLabel,
        _timer;

    // additional methods
    // remove class by name
    function removeClass(e, className) {
        e.className = e.className.replace(new RegExp("\\b" + className + "\\b\\s*", "g"), "");
    }

    // get cookie by name || undefined
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // set cookie by name and add duration
    function setCookie(name, value, expires) {

        value = encodeURIComponent(value);

        // set expire by seconds value
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = d.toUTCString();

        // update cookies
        var updatedCookie = name + "=" + value + "; expires=" + expires;
        document.cookie = updatedCookie;
    }

    // wrapper for different ways
    function addListener(element, type, handler){
        if (document.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        // IE
        else if (document.attachEvent) {
            element.attachEvent("on"+type, handler);
        }
        else {
            element["on"+type] = handler;
        }
    }

    // log in function
    function logIn(e) {
        var event = e || window.event;

        _logInWrapper.className += " login_hide";

        // prevent page reload
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }

        _userNameLabel.innerHTML = _userName.value || "user";
        setCookie("login", _userName.value || "user", _cookieLifeTime);
        logOut();
    }

    // log out + automatic log out
    function logOut(e) {
        var event = e || window.event;
        var delay;

        if (!getCookie("login")) {
           return false;
        }

        clearTimeout(_timer);


        // if this is an event, log out immediately
        (arguments.length !== 0)? delay = 0 : delay = _cookieLifeTime*1000;

        // prevent page reload
        if (arguments.length !== 0) {
            if (event.preventDefault) {
                event.preventDefault()
            } else {
                event.returnValue = false
            }
        }

        // log out
        _timer = setTimeout(function () {
            // show login form
            removeClass(_logInWrapper, "login_hide");

            // delete cookies
            setCookie("login", "", -1);

        }, delay);

        _userName.value = "";
    }

    return {
        init: function () {

            _logInWrapper = document.querySelector(".login");
            _logIn = document.getElementById("log-in");
            _logOut = document.getElementById("log-out");
            _userName = document.getElementById("login");
            _userNameLabel = document.getElementById("username");

            addListener(_logOut, "click", logOut);
            addListener(_logIn, "click", logIn);

            if (getCookie("login")) {
                _logInWrapper.className += " login_hide";
                _userNameLabel.innerHTML = getCookie("login");
                logOut();
            }

        }

    }
})();

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(login.init());