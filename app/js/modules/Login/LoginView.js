window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginView = (function (exports) {
    var facadeDOM = exports.facadeDOM,
        CONST = exports.CONST,
        popup = CONST.ID.popup,
        popupActive = CONST.ID.popupActive,
        popupHidden = CONST.ID.popupHidden,
        loginFormName = CONST.ID.loginFormName,
        loginFormPassword = CONST.ID.loginFormPassword,
        loginForm = CONST.ID.loginForm;

    function _hideForm() {
        facadeDOM.replaceClassName(popup, popupActive, popupHidden);
    }

    function _showForm() {
        facadeDOM.replaceClassName(popup, popupHidden, popupActive);
    }

    function _getFormInfo() {
        var user = {};

        user.login = facadeDOM.getValue(loginFormName);
        user.password = facadeDOM.getValue(loginFormPassword);

        return user;
    }

    function _clearForm() {
        facadeDOM.reset(loginForm);
    }

    function _logIn() {
        _hideForm();
        _clearForm();
    }

    function _start() {
        exports.pubsub.subscribe('/logIn', _logIn);
    }

    return {
        getFormInfo: _getFormInfo,
        showForm: _showForm,
        start: _start
    };
}(window.MYAPPLICATION));