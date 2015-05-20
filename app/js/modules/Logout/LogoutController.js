window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutController = (function (exports) {
    var CONST = exports.CONST,
        logOutButton = CONST.ID.logOutButton,
        facadeDOM = exports.facadeDOM,
        view = exports.LogoutView;

    function _logOut() {
        var model = exports.LogoutModel,
            logoutRequest = new XMLHttpRequest();
        logoutRequest.withCredentials = true;

        logoutRequest.onload = function () {
            if (logoutRequest.status === 200) {
                model.setStatus(false);
            }
        };

        logoutRequest.open('GET', 'http://localhost:3000/logout', true);
        logoutRequest.send();
    }

    function _showDashboard(name) {
        view.showDashboard(name);
    }

    function _start() {
        view.start();
        facadeDOM.addEventListener(logOutButton, 'click', _logOut);
    }

    return {
        showDashboard: _showDashboard,
        start: _start
    };
}(window.MYAPPLICATION));