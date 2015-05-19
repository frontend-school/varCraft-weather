window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutView = (function (exports) {
    var greeting = "Hello ",
        helperModule = exports.helperModule,
        CONST = exports.CONST;

    function _hideDashboard() {
        helperModule.getElement(CONST.ID.dashboardGreeting).innerHTML = "";
        helperModule.replaceClassName(CONST.ID.dashboard, CONST.ID.dashboardActive, CONST.ID.dashboardHidden);
    }
    function _showDashboard(name) {
        helperModule.getElement(CONST.ID.dashboardGreeting).textContent = greeting + name;
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
