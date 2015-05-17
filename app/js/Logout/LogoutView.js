window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutView = (function () {
    var helperModule = window.MYAPPLICATION.helperModule,
        CONST = window.MYAPPLICATION.CONST,
        controller = window.MYAPPLICATION.LogoutController;
    function _hideDashboard() {
        helperModule.getElement(CONST.ID.dashboardGreeting).innerHTML = "";
        helperModule.replaceClassName(CONST.ID.dashboard, CONST.ID.dashboardActive, CONST.ID.dashboardHidden);
    }

    function _showForm() {
        helperModule.replaceClassName(CONST.ID.popup, CONST.ID.popupHidden, CONST.ID.popupActive);
    }
    return {
        loadPage: function () {
            _hideDashboard();
            _showForm();
        },
        start: function () {
            helperModule.getElement(CONST.ID.logOutButton).addEventListener('click', controller.logOut);
            window.MYAPPLICATION.pubsub.subscribe('/logOut', function () {
                _hideDashboard();
                _showForm();
            });
        }
    };
}());
