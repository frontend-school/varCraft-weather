
(function (namespace) {
    function StorageController() {
        this.sessionKeys = {
            lastLoggedName: 'lastLoggedName'
        };
    }
    StorageController.prototype.clearLogs = function () {
        for (var key in this.sessionKeys) {
            sessionStorage.removeItem(this.sessionKeys[key]);
        }
    };
    StorageController.prototype.setLoggedName = function (lastLoggedName) {
        lastLoggedName = ( (lastLoggedName === undefined) ? '' : lastLoggedName);
        sessionStorage.setItem(this.sessionKeys.lastLoggedName, lastLoggedName);
    };
    StorageController.prototype.getLoggedName = function () {
        return sessionStorage.getItem(this.sessionKeys.lastLoggedName);
    };
    StorageController.prototype.isLogged = function () {
        return (sessionStorage.getItem(this.sessionKeys.lastLoggedName) !== undefined &&
            sessionStorage.getItem(this.sessionKeys.lastLoggedName) !== null);
    };

    namespace.StorageController = StorageController;
})(window.vCWeather.modules);
