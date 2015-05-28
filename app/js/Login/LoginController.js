window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.LoginController = (function () {
    var CONST = window.VarCraft.CONST,
        _model = window.VarCraft.modules.LoginModel,
        _view = window.VarCraft.modules.LoginView,
        _loginButton;

    var _login = function () {
        _model.setState(true);
        _view.logIn();
    };

    var _logout = function () {
        _model.setState(false);
    };

    var _loginSuccess = function () {
        window.modules.pubsub.publish(CONST.ACTION.LOGGED_IN, _view.getUserCredential());
        _login();
        return true;
    };

    var _loginError = function () {
        return false;
    };

    // AJAX request
    var _serverRequest = function (user) {
        var xhr = new window.VarCraft.AJAXRequest('GET', CONST.URL.LOGIN_WEBSERVICE + 'login', true);
        xhr.setGetParams(user);
        xhr.send(_loginSuccess, _loginError);
    };

    // listener on the button
    var _loginListener = function (e) {
        e.preventDefault();
        _serverRequest(_view.getUserCredential());
    };

    var _start = function () {
        // set listener
        _loginButton = _view.getLoginButton();
        _loginButton.addEventListener('click', _loginListener, false);

        // for auto logout
        window.modules.pubsub.subscribe(CONST.ACTION.LOGIN_STATE, _login);
        // for changing state
        window.modules.pubsub.subscribe(CONST.ACTION.LOGOUT_STATE, _logout);
    };

    return {
        start: _start
    };
})();


