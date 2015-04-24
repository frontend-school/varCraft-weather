var pageModule = ( function() {
    return{
        logIn: function () {
            var userName = document.getElementById("name").value;

            if (userName === "" ||  document.getElementById("password").value === "") {
                return;
            }
            //add simple validation
            formModule.hideForm();
            cookieModule.writeCookie('testCookie', userName, getStayTime());
            dashboardModule.showDashboard(userName);
            formModule.clearForm();
            timerModule.startTimer();
        },
        logOut: function () {
            cookieModule.eraseCookie('testCookie');
            timerModule.stopTimer();
            dashboardModule.hideDashboard();
            formModule.showForm();
        },
        reloadPage: function () {
            cookieModule.eraseCookie('testCookie');
            dashboardModule.hideDashboard();
            formModule.showForm();
        }
    };
}());

