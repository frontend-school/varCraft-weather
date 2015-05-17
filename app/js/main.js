window.MYAPPLICATION = window.MYAPPLICATION || {};

//= constants.js
//= helperModule.js
//= pubsub.js
//= timeDateFormat.js
//= cookieModule.js
//= weatherModule.js
//= timerModule.js
//= eventModule.js
//= TimeDate/TimeDateController.js
//= TimeDate/TimeDateView.js
//= TimeDate/TimeDateModel.js
//= Logout/LogoutController.js
//= Logout/LogoutView.js
//= Logout/LogoutModel.js
//= Login/LoginController.js
//= Login/LoginView.js
//= Login/LoginModel.js

document.onload = (function () {
    var CONST = window.MYAPPLICATION.CONST,
        cookie = window.MYAPPLICATION.cookieModule,
        userName = cookie.readCookie(CONST.cookieName),
        timeDateController = window.MYAPPLICATION.TimeDateController,
        logoutController = window.MYAPPLICATION.LogoutController,
        loginController = window.MYAPPLICATION.LoginController,
        eventModule = window.MYAPPLICATION.eventModule,
        pubsub = window.MYAPPLICATION.pubsub,
        timerModule = window.MYAPPLICATION.timerModule;

    timeDateController.start();
    //weatherModule.writeWeather();//for api working example
    //location.writeLocation//for future;

    logoutController.start();
    loginController.start();

    if (userName) {
        cookie.writeCookie(CONST.cookieName, userName, CONST.stayTime);
        loginController.showDash(userName);//delete
        timerModule.restartTimer(logoutController.logOut);
    } else {
        logoutController.logOut();
    }

    pubsub.subscribe('/active', function () {
        //rewrite cookie restart timer
        cookie.writeCookie(CONST.cookieName, cookie.readCookie(CONST.cookieName), CONST.stayTime);
        timerModule.restartTimer(logoutController.logOut); //reload page by timer
    });
    eventModule.startEventModule(); //generate /active
})();
