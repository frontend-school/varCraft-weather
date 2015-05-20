window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutView = (function (exports) {
    var greeting = "Hello ",
        facadeDOM = exports.facadeDOM,
        CONST = exports.CONST;

    function _hideDashboard() {
        facadeDOM.writeInto(CONST.ID.dashboardGreeting, "");
        facadeDOM.replaceClassName(CONST.ID.dashboard, CONST.ID.dashboardActive, CONST.ID.dashboardHidden);
    }
    function _showDashboard(name) {
        facadeDOM.writeInto(CONST.ID.dashboardGreeting, greeting + name);
        facadeDOM.replaceClassName(CONST.ID.dashboard, CONST.ID.dashboardHidden, CONST.ID.dashboardActive);
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
