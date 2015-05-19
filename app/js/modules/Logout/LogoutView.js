window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutView = (function (exports) {
    var greeting = "Hello ",
        helperModule = exports.helperModule,
        CONST = exports.CONST;

    function _hideDashboard() {
        helperModule.writeInto(CONST.ID.dashboardGreeting, "");
        helperModule.replaceClassName(CONST.ID.dashboard, CONST.ID.dashboardActive, CONST.ID.dashboardHidden);
    }
    function _showDashboard(name) {
        helperModule.writeInto(CONST.ID.dashboardGreeting, greeting + name);
        helperModule.replaceClassName(CONST.ID.dashboard, CONST.ID.dashboardHidden, CONST.ID.dashboardActive);
    }

    return {
        showDashboard: function (name) {
            _showDashboard(name);
        },
        start: function () {
            exports.pubsub.subscribe('/logOut', function () {
                _hideDashboard();
            });
        }
    };
}(window.MYAPPLICATION));
