window.MYAPPLICATION = window.MYAPPLICATION || {};

//= constants.js
//= services/facadeDOM.js
//= services/pubsub.js
//= services/infoDateFormat.js
//= services/cookieModule.js
//= services/facadeRequest.js
//= services/weatherDateFormat.js
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
//= modules/Location/LocationView.js
//= modules/Location/LocationModel.js
//= modules/Location/LocationController.js


document.onload = (function (exports) {
    var CONST = exports.CONST,
        cookie = exports.cookieModule,
        userName = cookie.readCookie(CONST.cookieName),
        timeDateController = exports.TimeDateController,
        logoutController = exports.LogoutController,
        loginController = exports.LoginController,
        location = exports.LocationController,
        pubsub = exports.pubsub,
        countryFormat = exports.countryFormat.getCountryName,
        infoDateFormat = exports.infoDateFormat,
        timeFormat = infoDateFormat.getTime,
        diemFormat = infoDateFormat.getDiem,
        dateFormat = infoDateFormat.getInfoDate,
        weatherDateFormat = exports.weatherDateFormat.format;

    timeDateController.start(timeFormat, diemFormat, dateFormat, weatherDateFormat);
    //weatherController.start();//for api working example
    location.start(countryFormat);

    logoutController.start();
    loginController.start();

    pubsub.subscribe('/logOut', function () {
        cookie.eraseCookie(CONST.cookieName);
        loginController.showForm();
    });

    pubsub.subscribe('/logIn', function (name) {
        cookie.writeCookie(CONST.cookieName, name, CONST.stayTime);
        logoutController.showDashboard(name);
    });

    if (userName) {
        cookie.writeCookie(CONST.cookieName, userName, CONST.stayTime);
        logoutController.showDashboard(userName);
    } else {
        loginController.showForm();
    }
})(window.MYAPPLICATION);
