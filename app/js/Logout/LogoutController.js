(function (namespace) {
    function LogoutController(model, view) {
        this._model = model;
        this._view = view;

        var self = this;

        this._view._elements.logout.logoutBtn.addEventListener('click', function (ev) {
            self.logOut(ev);
        });
    }
    //LoginController.prototype.logIn = function (ev) {
    //    var params = {
    //        'login': this._view._elements.login.loggingName.value,
    //        'password': this._view._elements.login.loggingPassword.value
    //    };
    //
    //    var self = this;
    //    window.vCWeather.sendRequestToServer('/login', params, function () {
    //        self._model.setLoggingName(params.login);
    //        self._view.hideLoggingForm();
    //    });
    //
    //    ev.preventDefault();
    //};
    //
    //function _setLoggingName(loggingName) {
    //    var elements = document.getElementsByClassName('js-login-name');
    //    if (elements.length)
    //        elements[0].value = loggingName;
    //}

    LogoutController.prototype.logOut = function (ev, skipPreventing) {
        // 1. show block, restore login; 2. stop timer; 3. clear logs; 4. remove handlers
        /*var CLASSES_LOGGING = window.vCWeather.CONST.CLASSES_LOGGING;

        window.vCWeather.replaceClassName(CLASSES_LOGGING.TO_HIDE_BLOCK, CLASSES_LOGGING.TO_SHOW_BLOCK);
        _setLoggingName(_storageController.getLoggedName()); // covers case if reload was

        _storageController.clearLogs();

        if (timer !== undefined) {
            timer.stopWatchingInactivity();
            this.stopActivityListening(timer.processActivityListening);
        }*/
        console.log('log outing..');
        var self = this;
        window.vCWeather.sendRequestToServer('/logout', {}, function () {
            self._model.clearData();
            self._view.showLoggingForm();
        });

        /*if (!skipPreventing)
         ev.preventDefault();*/
    };

    namespace.LogoutController = LogoutController;
})(window.vCWeather.modules);