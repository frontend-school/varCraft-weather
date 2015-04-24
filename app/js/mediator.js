window.VarCraft = window.VarCraft || {};

(function (context) {

    var CONST = window.VarCraft.CONST,
        mediator = {};

    // get necessary values
    var wrapper = document.querySelector(CONST.SELECTORS.LOGIN_WRAPPER);
    var userLoginLabel = document.querySelector(CONST.SELECTORS.USER_LOGIN_LABEL);
    var userLogin = document.querySelector(CONST.SELECTORS.USER_LOGIN);

    // add cookies
    mediator.login = function() {
        context.modules.Cookies.set("login", userLogin.value || "user", CONST.COOKIES.DURATION);

        // auto log out after 30 minutes
        context.modules.Logout.autoLogOut(CONST.COOKIES.DURATION);
    };

    mediator.logout = function() {
        context.modules.Cookies.set("login", "", -1);
    };


    mediator.initLoginLogout = function () {

        // initiate modules
        context.modules.Login.init();
        context.modules.Logout.init();


        // hide login form if it less than 30 minutes left
        if (context.modules.Cookies.get("login")) {
            wrapper.className += " login_hide";
            userLoginLabel.innerHTML = context.modules.Cookies.get("login");
            context.modules.Logout.autoLogOut(CONST.COOKIES.DURATION);
        }
    };

    context.mediator = mediator;


})(window.VarCraft);


function ready(fn) {
    if (document.readyState !== 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(window.VarCraft.mediator.initLoginLogout);


