window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.LogoutController = (function () {
    var CONST = window.VarCraft.CONST,
        _timer,
        _model = window.VarCraft.modules.LogoutModel,
        _view = window.VarCraft.modules.LogoutView,
        logoutButton;

    // Callbacks
    var _logoutSuccess = function () {
        _logOutByTimer(0);
        _model.setState();
        window.modules.pubsub.publish(CONST.ACTION.LOGGED_OUT);
        return true;
    };

    var _logoutError = function () {
        return false;
    };
    //

    // log out
    var _logOutByTimer = function (delay) {
        // clear timer
        clearTimeout(_timer);

        // log out
        _timer = setTimeout(function () {
            // show login form
            _view.logout();
        }, delay);

    };

    // AJAX request
    var _serverRequest = function () {
        var xhr = new AJAXRequest('GET', CONST.URL.LOGIN_WEBSERVICE + 'logout', true);
        xhr.send(_logoutSuccess, _logoutError);
    };

    // listener on the button
    var _logoutListener = function (e) {
        e.preventDefault();
        _serverRequest();
    };

    var _loginLabel = function (user) {
        _view.setUsername(user);
        _model.setState(false);
    };

    var _autoLogout = function (obj) {
        _logOutByTimer(obj.cookies);
        _loginLabel(obj);
    };

    var _start = function () {
        // set listener
        logoutButton = _view.getLogoutButton();
        logoutButton.addEventListener('click', _logoutListener, false);

        // autoLogOut
        window.modules.pubsub.subscribe(CONST.ACTION.LOGIN_STATE, _autoLogout);
    };

    return {
        start: _start
    };
})();

