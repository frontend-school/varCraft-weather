var pageModule = (function () {
    return {
        logIn: function () {
            var userName = helperModule.getElement(loginFormName).value,
                password = helperModule.getElement(loginFormPassword).value;
            if (userName === "" ||  password === "") {
                return;
            }
            //add simple validation
            formModule.hideForm();

            cookieModule.writeCookie(cookieName, userName, getStayTime());
            dashboardModule.showDashboard(userName);
            formModule.clearForm();
            timerModule.startTimer();
        },
        logOut: function () {
            cookieModule.eraseCookie(cookieName);
            timerModule.stopTimer();
            dashboardModule.hideDashboard();
            formModule.showForm();
        },
        reloadPage: function () {
            cookieModule.eraseCookie(cookieName);
            dashboardModule.hideDashboard();
            formModule.showForm();
        }
    };
}());

