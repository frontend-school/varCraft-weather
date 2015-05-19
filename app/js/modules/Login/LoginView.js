window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginView = (function (exports) {
    var helperModule = exports.helperModule,
        CONST = exports.CONST;

    function _hideForm() {
        helperModule.replaceClassName(CONST.ID.popup, CONST.ID.popupActive, CONST.ID.popupHidden);
    }

    function _showForm() {
        helperModule.replaceClassName(CONST.ID.popup, CONST.ID.popupHidden, CONST.ID.popupActive);
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
        showForm: function () {
            _showForm();
        },
        start: function () {
            exports.pubsub.subscribe('/logIn', function () {
                _hideForm();
                _clearForm();
            });
        }
    };
}(window.MYAPPLICATION));