
(function (namespace) {
    function Mediator() {
        var CONST = window.vCWeather.CONST;

        var pubsub = new namespace.PubSub();
        var storageService = new namespace.StorageController();

        var loginModel = new namespace.LoginModel(storageService);

        var viewElements = {
            login: {
                'loggingName': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.LOGGING_NAME),
                'loggingPassword': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.LOGGING_PASSWORD),
                'loggingForm': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.LOGGING_FORM),
                'halloMessage': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.HALLO_MESSAGE)
            }, logout: {
                'logoutBtn': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.LOG_OUT)
            }
        };
        var loginView = new namespace.LoginView(loginModel, viewElements);
        var loginController = new namespace.LoginController(loginModel, loginView);

        var logoutModel = new namespace.LogoutModel(storageService);
        var logoutView = new namespace.LogoutView(logoutModel, viewElements);
        var logoutController = new namespace.LogoutController(logoutModel, logoutView);
    }

    namespace.Mediator = Mediator;
})(window.vCWeather.modules);