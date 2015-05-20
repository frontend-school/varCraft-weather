window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutView = (function (exports) {
    var greeting = "Hello ",
        facadeDOM = exports.facadeDOM,
        CONST = exports.CONST,
        dashboard = CONST.ID.dashboard,
        dashboardGreeting = CONST.ID.dashboardGreeting,
        dashboardActive = CONST.ID.dashboardActive,
        dashboardHidden = CONST.ID.dashboardHidden;

    function _hideDashboard() {
        facadeDOM.writeInto(dashboardGreeting, "");
        facadeDOM.replaceClassName(dashboard, dashboardActive, dashboardHidden);
    }

    function _showDashboard(name) {
        facadeDOM.writeInto(dashboardGreeting, greeting + name);
        facadeDOM.replaceClassName(dashboard, dashboardHidden, dashboardActive);
    }

    function _start() {
        exports.pubsub.subscribe('/logOut', _hideDashboard);
    }

    return {
        showDashboard: _showDashboard,
        start: _start
    };
}(window.MYAPPLICATION));
