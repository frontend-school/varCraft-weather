window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginController = (function () {
    var CONST = window.MYAPPLICATION.CONST;
    return {
        logIn: function () {
            var user = window.MYAPPLICATION.LoginView.getFormInfo(),
                loginRequest = new XMLHttpRequest();
            loginRequest.withCredentials = true;

            if (user.login === "" || user.password === "") {
                return;
            }
            loginRequest.onload = function () {
                if (loginRequest.status === 200) {
                    window.MYAPPLICATION.LoginModel.setStatus(user.login);
                    MYAPPLICATION.cookieModule.writeCookie(CONST.cookieName, user.login, CONST.stayTime);
                }
            };
            loginRequest.open('GET', 'http://localhost:3000/login', true);
            loginRequest.send();
        },
        showDash: function(user) {
            window.MYAPPLICATION.LoginModel.setStatus(user);
        },
        start: function () {
            window.MYAPPLICATION.LoginView.start();
        }
    };
}());