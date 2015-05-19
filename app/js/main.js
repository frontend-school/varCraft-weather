window.MYAPPLICATION = window.MYAPPLICATION || {};

//= constants.js
//= services/helperModule.js
//= services/pubsub.js
//= services/timeDateFormat.js
//= services/cookieModule.js
//= weatherModule.js
//= services/countryFormat.js
//= modules/TimeDate/TimeDateController.js
//= modules/TimeDate/TimeDateView.js
//= modules/TimeDate/TimeDateModel.js
//= modules/Logout/LogoutView.js
//= modules/Logout/LogoutModel.js
//= modules/Logout/LogoutController.js
//= modules/Login/LoginView.js
//= modules/Login/LoginModel.js
//= modules/Login/LoginController.js
//= modules/Location/LocationController.js
//= modules/Location/LocationView.js
//= modules/Location/LocationModel.js

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
