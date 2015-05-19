window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutController = (function (exports) {
    var CONST = exports.CONST,
        helperModule = exports.helperModule;

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
    function _showDashboard(name) {
        exports.LogoutView.showDashboard(name);
    }
    function _start() {
        exports.LogoutView.start();
        helperModule.getElement(CONST.ID.logOutButton).addEventListener('click', _logOut);
    }
    return {
        showDashboard: function (name) {
            _showDashboard(name);
        },
        start: _start
    };
}(window.MYAPPLICATION));