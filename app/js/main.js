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
//= Logout/LogoutController.js
//= Logout/LogoutView.js
//= Logout/LogoutModel.js
//= Login/LoginController.js
//= Login/LoginView.js
//= Login/LoginModel.js
//= Location/LocationController.js
//= Location/LocationView.js
//= Location/LocationModel.js

document.onload = (function () {
    var CONST = window.MYAPPLICATION.CONST,
        cookie = window.MYAPPLICATION.cookieModule,
        userName = cookie.readCookie(CONST.cookieName),
        timeDateController = window.MYAPPLICATION.TimeDateController,
        logoutController = window.MYAPPLICATION.LogoutController,
        loginController = window.MYAPPLICATION.LoginController,
        location = window.MYAPPLICATION.LocationController;

    timeDateController.start();
    //weatherModule.writeWeather();//for api working example
    location.start();
    logoutController.start();
    loginController.start();

    if (userName) {
        cookie.writeCookie(CONST.cookieName, userName, CONST.stayTime);
        loginController.showDash(userName);//delete
    } else {
        logoutController.logOut();
    }
})();
