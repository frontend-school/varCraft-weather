window.MYAPPLICATION.dashboardModule = (function () {
    var greeting = "Hello ";
    return {
        hideDashboard: function () {
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboardGreeting).innerHTML = "";
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className.replace
            (/(?:^|\s)dashboard_active(?!\S)/g, '');
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className += MYAPPLICATION.CONST.ID.dashboardHidden;
        },
        showDashboard: function (name) {
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboardGreeting).innerHTML = greeting + name;

            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className.replace
            (/(?:^|\s)dashboard_hidden(?!\S)/g, '');
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className += MYAPPLICATION.CONST.ID.dashboardActive;
        }
    };
}());

