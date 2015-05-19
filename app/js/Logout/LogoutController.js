window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutController = (function (exports) {
    var CONST = exports.CONST;

    function _logOut() {
        var model = exports.LogoutModel,
            cookie = exports.cookieModule,
            logoutRequest = new XMLHttpRequest();
        logoutRequest.withCredentials = true;

        logoutRequest.onload = function () {
            if (logoutRequest.status === 200) {
                cookie.eraseCookie(CONST.cookieName);//remove to mediator
                model.setStatus(false);
            }
        };

        logoutRequest.open('GET', 'http://localhost:3000/logout', true);
        logoutRequest.send();
    }
    function _start() {
        exports.pubsub.subscribe('/logOutPressed', function () {
            _logOut();
        });
        exports.LogoutView.start();
    }
    return {
        logOut: function () {
            _logOut();
        },
        start: _start
    };
}(window.MYAPPLICATION));