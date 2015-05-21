(function (namespace) {
    function LogoutModel(storageService) {

        this.getLoggingName = function () {
            return storageService.getLoggedName();
        };
        this.clearData = function () {
            storageService.clearLogs();
        };
    }

    namespace.LogoutModel = LogoutModel;

})(window.vCWeather.modules);