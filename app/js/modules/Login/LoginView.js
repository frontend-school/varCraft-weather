window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginView = (function (exports) {
    var facadeDOM = exports.facadeDOM,
        CONST = exports.CONST;

    function _hideForm() {
        facadeDOM.replaceClassName(CONST.ID.popup, CONST.ID.popupActive, CONST.ID.popupHidden);
    }

    function _showForm() {
        facadeDOM.replaceClassName(CONST.ID.popup, CONST.ID.popupHidden, CONST.ID.popupActive);
    }

    function _getFormInfo() {
        var user = {};
        user.login = facadeDOM.getElement(CONST.ID.loginFormName).value;
        user.password = facadeDOM.getElement(CONST.ID.loginFormPassword).value;

        return user;
    }
    function _clearForm() {
        facadeDOM.getElement(CONST.ID.loginForm).reset();
    }

    return {
        getFormInfo: _getFormInfo,
        showForm: _showForm,
        start: function () {
            exports.pubsub.subscribe('/logIn', function () {
                _hideForm();
                _clearForm();
            });
        }
    };
}(window.MYAPPLICATION));