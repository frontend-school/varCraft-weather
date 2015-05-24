(function (namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;
    var services = namespace.services;

    var pubsub = namespace.objects.pubsub;

    function LoginController(model, view) {
        this._model = model;
        this._view = view;

        var self = this;
        this._view._elements.login.loggingForm.addEventListener('submit', function (ev) {
            self.logIn(ev);
        });
    }
    LoginController.prototype.logIn = function (ev) {
        var params = {
            'login': this._view._elements.login.loggingName.value,
            'password': this._view._elements.login.loggingPassword.value
        };

        var self = this;
        services.sendRequestToServer(CONST.SERVER.ADDRESS + '/login', params, function () {
            self._model.setLoggedName(params.login);

            self.execLoggingActions(params.login);
        });

        ev.preventDefault();
    };
    LoginController.prototype.execLoggingActions = function (loggedName) {
        this._view.hideLoggingForm();

        pubsub.publish('userLoggedIn', loggedName);
    };

    modules.LoginController = LoginController;
})(window.vCWeather);