var dashboardModule = (function () {
    return {
        hideDashboard: function () {
            helperModule.getElement(dashboardGreating).innerHTML = "";
            helperModule.getElement(dashboard).className = helperModule.getElement(dashboard).className.replace
            (/(?:^|\s)b-dashboard_active(?!\S)/g , '');
            helperModule.getElement(dashboard).className += dashboardHidden;
        },
        showDashboard: function (name) {
            helperModule.getElement(dashboardGreating).innerHTML = greating + name;

            helperModule.getElement(dashboard).className = helperModule.getElement(dashboard).className.replace
            (/(?:^|\s)b-dashboard_hidden(?!\S)/g , '');
            helperModule.getElement(dashboard).className += dashboardActive;
        }
    };
}());

