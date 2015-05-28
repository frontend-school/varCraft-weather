//= constants.js
//= AJAXRequest.js
//= cookies.js
//= DateTimeFormat.js

//= DateTime/DateTimeView.js
//= Login/LoginView.js
//= Logout/LogoutView.js
//= Location/LocationView.js
//= Weather/WeatherView.js

//= DateTime/DateTimeModel.js
//= Login/LoginModel.js
//= Logout/LogoutModel.js
//= Location/LocationModel.js
//= Weather/WeatherModel.js

//= DateTime/DateTimeController.js
//= Login/LoginController.js
//= Logout/LogoutController.js
//= Location/LocationController.js
//= Weather/WeatherController.js

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
    window.VarCraft.modules.LogoutController.start();
    window.VarCraft.modules.LoginController.start();
    window.VarCraft.modules.LocationController.start();
    window.VarCraft.modules.DateTimeController.start();
    window.VarCraft.modules.WeatherController.start();

    // check if login
    if (cookies.get("login")) {
        _login();
    }
}

addEventListener('load', function(){
    window.VarCraft.main = new Main();
}, false);

