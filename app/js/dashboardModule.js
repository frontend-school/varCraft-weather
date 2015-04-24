MYAPPLICATION.dashboardModule = (function () {
    return {
        hideDashboard: function () {
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboardGreating).innerHTML = "";
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className.replace
            (/(?:^|\s)b-dashboard_active(?!\S)/g , '');
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className += MYAPPLICATION.CONST.ID.dashboardHidden;
        },
        showDashboard: function (name) {
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboardGreating).innerHTML = MYAPPLICATION.CONST.greating + name;

            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className.replace
            (/(?:^|\s)b-dashboard_hidden(?!\S)/g , '');
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.dashboard).className += MYAPPLICATION.CONST.ID.dashboardActive;
        }
    };
}());

