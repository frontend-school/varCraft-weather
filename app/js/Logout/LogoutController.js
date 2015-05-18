window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutController = (function () {
    var CONST = window.MYAPPLICATION.CONST,
        cookie = window.MYAPPLICATION.cookieModule;

    function _logOut() {
        var model = window.MYAPPLICATION.LogoutModel,
            logoutRequest = new XMLHttpRequest();
        logoutRequest.withCredentials = true;

        logoutRequest.onload = function () {
            if (logoutRequest.status === 200) {
                cookie.eraseCookie(CONST.cookieName);
                model.setStatus(false);
            }
        };

        logoutRequest.open('GET', 'http://localhost:3000/logout', true);
        logoutRequest.send();

    }
    return {
        logOut: function () {
            _logOut();
        },
        start: function () {
            window.MYAPPLICATION.LogoutView.start();
        }
    };
}());