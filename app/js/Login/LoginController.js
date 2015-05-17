window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginController = (function () {
    var CONST = window.MYAPPLICATION.CONST;
    return {
        logIn: function () {
            var user = window.MYAPPLICATION.LoginView.getFormInfo();
            if (user.login === "" || user.password === "") {
                return;
            }
            //call webservise
            window.MYAPPLICATION.LoginModel.setStatus(user.login);
            MYAPPLICATION.cookieModule.writeCookie(window.MYAPPLICATION.CONST.cookieName, user.login, window.MYAPPLICATION.CONST.stayTime);
        },
        showDash: function(user) {
            window.MYAPPLICATION.LoginModel.setStatus(user);
        },
        start: function () {
            window.MYAPPLICATION.LoginView.start();
        }
    };
}());