window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.Login = (function () {

    var CONST = window.VarCraft.CONST;

    // set log in listener on the button
    var _addEventListeners = function() {
        document.querySelector(CONST.SELECTORS.LOGIN_BUTTON).addEventListener("click", _logIn, false);
    };

    // log in function
    var _logIn = function (e) {
        // get necessary values
        var event = e || window.event,
            wrapper = document.querySelector(CONST.SELECTORS.LOGIN_WRAPPER),
            userLogin = document.querySelector(CONST.SELECTORS.USER_LOGIN),
            userLoginLabel = document.querySelector(CONST.SELECTORS.USER_LOGIN_LABEL);

        // hide log in form
        wrapper.className += " login_hide";

        // prevent page reload
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }

        // add name to the "Hello" label
        userLoginLabel.innerHTML = userLogin.value || "user";

        // do additional things
        window.VarCraft.mediator.login();
    };

    return {
        // public interface to initiate login module
        init: function(){
            _addEventListeners();
        }
    };
})();

