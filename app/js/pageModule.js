window.MYAPPLICATION.pageModule = (function () {
    return {
        logIn: function () {
            var userName = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.loginFormName).value,
                password = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.loginFormPassword).value;
            if (userName === "" ||  password === "") {
                return;
            }
            //add simple validation
            MYAPPLICATION.formModule.hideForm();
            MYAPPLICATION.cookieModule.writeCookie(MYAPPLICATION.CONST.cookieName, userName, MYAPPLICATION.CONST.stayTime);
            MYAPPLICATION.dashboardModule.showDashboard(userName);
            MYAPPLICATION.formModule.clearForm();
            MYAPPLICATION.timerModule.restartTimer();
        },
        logOut: function () {
            MYAPPLICATION.cookieModule.eraseCookie(MYAPPLICATION.CONST.cookieName);
            MYAPPLICATION.timerModule.restartTimer();
            MYAPPLICATION.dashboardModule.hideDashboard();
            MYAPPLICATION.formModule.showForm();
        },
        reloadPage: function () {
            MYAPPLICATION.cookieModule.eraseCookie(MYAPPLICATION.CONST.cookieName);
            MYAPPLICATION.dashboardModule.hideDashboard();
            MYAPPLICATION.formModule.showForm();
        }
    };
}());

