(function (namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;
    var services = namespace.services;

    var pubsub = namespace.objects.pubsub;

    function LogoutController(model, view) {
        this._model = model;
        this._view = view;

        var self = this;

        this._view._elements.logout.logoutBtn.addEventListener('click', function (ev) {
            self.logOut(ev);
        });

        pubsub.subscribe('userLoggedIn', function() {
            view.setHelloMessage();
        });
    }
    LogoutController.prototype.logOut = function (ev, skipPreventing) {
        // 1. show block, restore login; 2. stop timer; 3. clear logs; 4. remove handlers
        /*_setLoggingName(_storageController.getLoggedName()); // covers case if reload was
        */
        var self = this;
        services.sendRequestToServer(CONST.SERVER.ADDRESS + '/logout', {}, function () {
            self._view.showLoggingForm();
            self._view.showLoggedName();

            self._model.clearData();

            pubsub.publish('userLoggedOut');
        });

        /*if (!skipPreventing)
         ev.preventDefault();*/
    };

    modules.LogoutController = LogoutController;
})(window.vCWeather);