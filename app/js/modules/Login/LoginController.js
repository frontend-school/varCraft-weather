window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginController = (function (exports) {
    var CONST = exports.CONST,
        submitButton = CONST.ID.submitButton,
        facadeDOM = exports.facadeDOM,
        view = exports.LoginView,
        model = exports.LoginModel,
        request = exports.facadeRequest;


    function _start() {
        view.start();
        facadeDOM.addEventListener(submitButton, 'click', _logIn);
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
                model.setStatus(user.login);
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