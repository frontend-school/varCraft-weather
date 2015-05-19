window.MYAPPLICATION = window.MYAPPLICATION || {};

//= constants.js
//= helperModule.js
//= pubsub.js
//= timeDateFormat.js
//= cookieModule.js
//= weatherModule.js
//= countryFormat.js
//= TimeDate/TimeDateController.js
//= TimeDate/TimeDateView.js
//= TimeDate/TimeDateModel.js
//= Logout/LogoutView.js
//= Logout/LogoutModel.js
//= Logout/LogoutController.js
//= Login/LoginView.js
//= Login/LoginModel.js
//= Login/LoginController.js
//= Location/LocationController.js
//= Location/LocationView.js
//= Location/LocationModel.js

document.onload = (function (exports) {
    var CONST = exports.CONST,
        cookie = exports.cookieModule,
        userName = cookie.readCookie(CONST.cookieName),
        timeDateController = exports.TimeDateController,
        logoutController = exports.LogoutController,
        loginController = exports.LoginController,
        location = exports.LocationController,
        pubsub = exports.pubsub;

    timeDateController.start();
    //weatherModule.writeWeather();//for api working example
    location.start();
    logoutController.start();
    loginController.start();
    pubsub.subscribe('/logOut', function () {
        loginController.showForm();
    });
    pubsub.subscribe('/logIn', function (name) {
        logoutController.showDashboard(name);
    });

    if (userName) {
        cookie.writeCookie(CONST.cookieName, userName, CONST.stayTime);
        logoutController.showDashboard(userName);
    } else {
        loginController.showForm();
    }
})(window.MYAPPLICATION);
