window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.Logout = (function () {
    var CONST = window.VarCraft.CONST,
        _timer;

    // remove class by name
    var _removeClass = function (e, className) {
        e.className = e.className.replace(new RegExp("\\b" + className + "\\b\\s*", "g"), "");
    };

    // set log out listener on the button
    var _addEventListeners = function() {
        document.querySelector(CONST.SELECTORS.LOGOUT_BUTTON).addEventListener("click", _logOut, false);
    };

    // log out by button click
    var _logOut = function (e) {
        var event = e || window.event;

        // prevent page reload
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }

        // log out immediately
        _logOutByTimer(0);

        // do additional things
        window.VarCraft.mediator.logout();

    };

    // log out
    var _logOutByTimer = function (delay) {
        // get necessary values
        var userLogin = document.querySelector(CONST.SELECTORS.USER_LOGIN),
            wrapper = document.querySelector(CONST.SELECTORS.LOGIN_WRAPPER);

        // clear timer
        clearTimeout(_timer);

        // log out
        _timer = setTimeout(function () {
            // show login form
            _removeClass(wrapper, "login_hide");
        }, delay);

        // clear input field
        userLogin.value = "";
    };

    return {
        // public interface
        // initiate logout module
        init: function () {
            _addEventListeners();
        },

        // auto log out after n seconds
        autoLogOut: function (n) {
            _logOutByTimer(n);
        }
    };
})();

