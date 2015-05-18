//= constants.js
//= AJAXRequestBuilder.js
//= cookies.js

//= DateTime/DateTimeView.js
//= Login/LoginView.js
//= Logout/LogoutView.js

//= DateTime/DateTimeModel.js
//= Login/LoginModel.js
//= Logout/LogoutModel.js

//= DateTime/DateTimeController.js
//= Login/LoginController.js
//= Logout/LogoutController.js


function Main() {
    var CONST = window.VarCraft.CONST,
        cookies = window.VarCraft.modules.Cookies;

    // set cookies
    var _login = function(user) {
        if (!user) {
            user = {};
            user.login = cookies.get("login");
        }

        var userCookie = {
            'cookies': CONST.COOKIES.DURATION,
            'login': user.login
        };

        window.VarCraft.modules.Cookies.set("login", userCookie.login || "user", userCookie.cookies);
        window.modules.pubsub.publish(CONST.ACTION.LOGIN_STATE, userCookie);
    };

    var _logout = function() {
        window.VarCraft.modules.Cookies.set("login", "", -1);
        window.modules.pubsub.publish(CONST.ACTION.LOGOUT_STATE);
    };

    // subscribe on Login/Logout Controller topic
    window.modules.pubsub.subscribe(CONST.ACTION.LOGGED_IN, _login);
    window.modules.pubsub.subscribe(CONST.ACTION.LOGGED_OUT, _logout);

    // start modules
    window.VarCraft.modules.DateTimeController.start();
    window.VarCraft.modules.LogoutController.start();
    window.VarCraft.modules.LoginController.start();

    // check if login
    if (cookies.get("login")) {
        _login();
    }
}

addEventListener('load', function(){
    window.VarCraft.main = new Main();
}, false);

