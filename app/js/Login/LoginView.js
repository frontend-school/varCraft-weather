window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginView = (function (exports) {
    var greeting = "Hello ",
        helperModule = exports.helperModule,
        CONST = exports.CONST,
        controller = exports.LoginController;

    function _hideForm() {
        helperModule.replaceClassName(CONST.ID.popup, CONST.ID.popupActive, CONST.ID.popupHidden);
    }

    function _showDashboard(name) {
        helperModule.getElement(CONST.ID.dashboardGreeting).textContent = greeting + name;
        helperModule.replaceClassName(CONST.ID.dashboard, CONST.ID.dashboardHidden, CONST.ID.dashboardActive);
    }

    function _getFormInfo() {
        var user = {};
        user.login = helperModule.getElement(CONST.ID.loginFormName).value;
        user.password = helperModule.getElement(CONST.ID.loginFormPassword).value;

        return user;
    }
    function _clearForm() {
        helperModule.getElement(CONST.ID.loginForm).reset();
    }

    return {
        getFormInfo: function () {
            return _getFormInfo();
        },
        showDash: function (user) {
            _showDashboard(user);
        },
        start: function () {
            helperModule.getElement(CONST.ID.submitButton).addEventListener('click', function() {
                exports.pubsub.publish('/logInPressed', {});
            });
            exports.pubsub.subscribe('/logIn', function (user) {
                _hideForm();
                _clearForm();
                _showDashboard(user);
            });
        }
    };
}(window.MYAPPLICATION));