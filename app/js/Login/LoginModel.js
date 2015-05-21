
(function (namespace) {
    function LoginModel(storageService) {
        //var _loggingName = '';
        this.loggingNameChanged = new namespace.Event();

        this.setLoggingName = function (loggingName) {
            //_loggingName = loggingName;
            storageService.setLoggedName(loggingName);

            this.loggingNameChanged.notify(loggingName);
        };
        this.getLoggingName = function () {
            //return _loggingName;
            return storageService.getLoggedName();
        };
    }

    namespace.LoginModel = LoginModel;

})(window.vCWeather.modules);
