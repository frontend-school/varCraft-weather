
(function (namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;

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

    modules.LoginModel = LoginModel;

})(window.vCWeather);
