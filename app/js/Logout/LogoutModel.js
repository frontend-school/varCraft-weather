(function (namespace) {
    function LogoutModel(storageService) {
        this.getLoggedName = function () {
            return storageService.getLoggedName();
        };
        this.clearData = function () {
            storageService.clearLogs();
        };
    }

    namespace.LogoutModel = LogoutModel;
})(window.vCWeather.modules);