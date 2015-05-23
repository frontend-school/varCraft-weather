
(function (namespace) {
    function LoginModel(storageService) {
        //this.loggingNameChanged = new namespace.Event();

        this.setLoggedName = function (loggingName) {
            storageService.setLoggedName(loggingName);

            //this.loggingNameChanged.notify(loggingName);
        };
        //this.getLoggedName = function () {
        //    return storageService.getLoggedName();
        //};
    }

    namespace.LoginModel = LoginModel;

})(window.vCWeather.modules);
