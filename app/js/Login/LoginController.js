(function (namespace) {
    var CONST = window.vCWeather.CONST;
    var pubsub = window.vCWeather.objects.pubsub;

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
        window.vCWeather.sendRequestToServer(CONST.SERVER.ADDRESS + '/login', params, function () {
            self._model.setLoggedName(params.login);

            self.execLoggingActions(params.login);
        });

        ev.preventDefault();
    };
    LoginController.prototype.execLoggingActions = function (loggedName) {
        this._view.hideLoggingForm();

        pubsub.publish('userLoggedIn', loggedName);
    };

    namespace.LoginController = LoginController;
})(window.vCWeather.modules);