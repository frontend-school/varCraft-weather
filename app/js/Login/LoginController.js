window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginController = (function (exports) {
    var CONST = exports.CONST;

    function _start() {
        exports.pubsub.subscribe('/logInPressed', function () {
            _logIn();
        });
        exports.LoginView.start();
    }
    function _showDash(user) {
        exports.LoginModel.setStatus(user);
    }
    function _logIn() {
        var user = exports.LoginView.getFormInfo(),
            loginRequest = new XMLHttpRequest();
        loginRequest.withCredentials = true;

        if (user.login === "" || user.password === "") {
            return;
        }
        loginRequest.onload = function () {
            if (loginRequest.status === 200) {
                exports.LoginModel.setStatus(user.login);
                exports.cookieModule.writeCookie(CONST.cookieName, user.login, CONST.stayTime);//remove to mediator by pubsub
            }
        };
        loginRequest.open('GET', 'http://localhost:3000/login', true);
        loginRequest.send();
    }
    return {
        logIn: _logIn,
        showDash: function (user) {
            _showDash(user);
        },
        start: _start
    };
}(window.MYAPPLICATION));