window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutController = (function () {
    var CONST = window.MYAPPLICATION.CONST,
        cookie = window.MYAPPLICATION.cookieModule;

    function _logOut() {
        var model = window.MYAPPLICATION.LogoutModel;
        cookie.eraseCookie(CONST.cookieName);
        model.setStatus(false);
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