window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

// view
window.VarCraft.modules.LoginView = (function () {
    var CONST = window.VarCraft.CONST,
        _loginButton = document.querySelector(CONST.SELECTORS.LOGIN_BUTTON),
        _loginInput = document.querySelector(CONST.SELECTORS.USER_LOGIN),
        _passwordInput = document.querySelector(CONST.SELECTORS.USER_PASSWORD),
        _wrapper = document.querySelector(CONST.SELECTORS.LOGIN_WRAPPER);

    var _logIn = function () {
        // hide log in form
        _wrapper.className += " login_hide";
    };

    // for listener
    var _getLoginButton = function () {
        return _loginButton;
    };

    // for AJAX request
    var _getUserCredential = function () {
        return {
            login: _loginInput.value || "user",
            password: _passwordInput.value || "password"
        };
    };

    return {
        logIn: _logIn,
        getLoginButton: _getLoginButton,
        getUserCredential: _getUserCredential
    };
})();


