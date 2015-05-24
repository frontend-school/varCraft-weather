(function (namespace) {
    var modules = namespace.modules;

    function LogoutModel(storageService) {
        this.getLoggedName = function () {
            return storageService.getLoggedName();
        };
        this.clearData = function () {
            storageService.clearLogs();
        };
    }

    modules.LogoutModel = LogoutModel;
})(window.vCWeather);