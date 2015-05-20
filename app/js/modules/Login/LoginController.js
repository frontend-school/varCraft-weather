window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginController = (function (exports) {
    var CONST = exports.CONST,
        facadeDOM = exports.facadeDOM,
        view = exports.LoginView,
        model = exports.LoginModel;

    function _start() {
        view.start();
        facadeDOM.getElement(CONST.ID.submitButton).addEventListener('click', _logIn);
    }

    function _logIn() {
        var user = view.getFormInfo(),
            loginRequest = new XMLHttpRequest();
        loginRequest.withCredentials = true;

        if (user.login === "" || user.password === "") {
            return;
        }
        loginRequest.onload = function () {
            if (loginRequest.status === 200) {
                model.setStatus(user.login);
                exports.cookieModule.writeCookie(CONST.cookieName, user.login, CONST.stayTime);//remove to mediator by pubsub
            }
        };
        loginRequest.open('GET', 'http://localhost:3000/login', true);
        loginRequest.send();
    }

    function _showForm() {
        view.showForm();
    }

    return {
        logIn: _logIn,
        showForm: _showForm,
        start: _start
    };
}(window.MYAPPLICATION));