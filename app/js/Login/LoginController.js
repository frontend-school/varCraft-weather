(function (namespace) {
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
        window.vCWeather.sendRequestToServer('/login', params, function () {
            self._model.setLoggingName(params.login);
            self._view.hideLoggingForm();
        });

        ev.preventDefault();
    };

    namespace.LoginController = LoginController;
})(window.vCWeather.modules);