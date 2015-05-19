window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginController = (function (exports) {
    var CONST = exports.CONST,
        helperModule = exports.helperModule;

    function _start() {
        exports.LoginView.start();
        helperModule.getElement(CONST.ID.submitButton).addEventListener('click', _logIn);
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
    function _showForm() {
        exports.LoginView.showForm();
    }
    return {
        logIn: _logIn,
        showForm: function () {
            _showForm();
        },
        start: _start
    };
}(window.MYAPPLICATION));