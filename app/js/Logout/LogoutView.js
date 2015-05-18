window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.LogoutView = (function () {
    var CONST = window.VarCraft.CONST,
        _logoutButton = document.querySelector(CONST.SELECTORS.LOGOUT_BUTTON),
        _userLogin = document.querySelector(CONST.SELECTORS.USER_LOGIN),
        _userLoginLabel = document.querySelector(CONST.SELECTORS.USER_LOGIN_LABEL),
        _wrapper = document.querySelector(CONST.SELECTORS.LOGIN_WRAPPER);

    // remove class by name
    var _removeClass = function (e, className) {
        e.className = e.className.replace(new RegExp("\\b" + className + "\\b\\s*", "g"), "");
    };

    var _getLogoutButton = function () {
        return _logoutButton;
    };

    var _logout = function () {
        _removeClass(_wrapper, "login_hide");
        // clear input field
        _userLogin.value = "";
    };

    var _setUsername = function (user) {
        // add name to the "Hello" label
        _userLoginLabel.innerHTML = user.login || "user";
    };

    return {
        logout: _logout,
        getLogoutButton: _getLogoutButton,
        setUsername: _setUsername
    };
})();

