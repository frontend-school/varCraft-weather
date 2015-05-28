window.vCWeather = window.vCWeather || {};
window.vCWeather.CONST = window.vCWeather.CONST || {};
window.vCWeather.modules = window.vCWeather.modules || {};
window.vCWeather.objects = window.vCWeather.objects || {};
window.vCWeather.services = window.vCWeather.services || {};

//= Constants.js

//= StorageController.js
//= PubSub.js
//= Event.js

//= Services/sendRequestToServer.js
//= Services/getElementsTree.js
//= Services/updateClassModificator.js

//= DateTimeUpdater/DateTimeModel.js
//= DateTimeUpdater/DateTimeView.js
//= DateTimeUpdater/DateTimeController.js

//= Login/LoginModel.js
//= Login/LoginView.js
//= Login/LoginController.js

//= Logout/LogoutModel.js
//= Logout/LogoutView.js
//= Logout/LogoutController.js

//= Location/LocationModel.js
//= Location/LocationView.js
//= Location/LocationController.js

//= Weather/WeatherModel.js
//= Weather/WeatherView.js
//= Weather/WeatherController.js

window.onload = function() {

    var CONST = window.vCWeather.CONST;
    var modules = window.vCWeather.modules;
    var objects = window.vCWeather.objects;
    var services = window.vCWeather.services;

    //var mediator = new window.vCWeather.modules.Mediator();
    //var pubsub = new namespace.PubSub();

    var viewElements = {
        login: {
            'loggingName': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.LOGGING_NAME),
            'loggingPassword': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.LOGGING_PASSWORD),
            'loggingForm': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.LOGGING_FORM),
            'halloMessage': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.HALLO_MESSAGE)
        },
        logout: {
            'logoutBtn': document.querySelector(CONST.CLASSES_LOGGING_CONTROLS.LOG_OUT)
        }
    };

    var storageService = new modules.StorageController();

    var loginModel = new modules.LoginModel(storageService);
    var loginView = new modules.LoginView(loginModel, viewElements);
    var loginController = new modules.LoginController(loginModel, loginView);

    var logoutModel = new modules.LogoutModel(storageService);
    var logoutView = new modules.LogoutView(logoutModel, viewElements);
    var logoutController = new modules.LogoutController(logoutModel, logoutView);

    // DateTimeUpdater to display the current time
    (function () {
        var elements = {
            time: window.document.querySelector(CONST.CLASSES_DAY_TIME.TIME),
            timePeriod: window.document.querySelector(CONST.CLASSES_DAY_TIME.TIME_PERIOD),
            day: window.document.querySelector(CONST.CLASSES_DAY_TIME.DAY),

            dayList: {
                yesterday: window.document.querySelector(CONST.CLASSES_DAY_TIME.DAY_LIST.DATE_YESTERDAY),
                today: window.document.querySelector(CONST.CLASSES_DAY_TIME.DAY_LIST.DATE_TODAY),
                tomorrow: window.document.querySelector(CONST.CLASSES_DAY_TIME.DAY_LIST.DATE_TOMORROW)
            }
        };

        var dateTimeUpdaterModel = new modules.DateTimeUpdaterModel();
        var dateTimeUpdaterView = new modules.DateTimeUpdaterView(dateTimeUpdaterModel, elements);
        var dateTimeUpdaterController = new modules.DateTimeUpdaterController(dateTimeUpdaterModel, dateTimeUpdaterView);
    })();

    (function () {
        var elements = {
            city: window.document.querySelector(CONST.CLASSES_LOCATION.CITY),
            country: window.document.querySelector(CONST.CLASSES_LOCATION.COUNTRY)
        };
        var locationModel = new modules.LocationModel();
        var locationView = new modules.LocationView(locationModel, elements);
        var locationController = new modules.LocationController(locationModel, locationView);
    })();

    var weatherModel = new modules.WeatherModel();
    var weatherView = new modules.WeatherView(weatherModel);
    var weatherController = new modules.WeatherController(weatherModel, weatherView);

    if (storageService.isLogged()) {
        loginController.execLoggingActions();
    }

    var self = this;
    services.sendRequestToServer(CONST.SERVER.ADDRESS + '/weather', {}, function (respText) {
        var w = JSON.parse(respText);
        console.log('res ', w);
    });


}; /* window.onload */

// Searches elements containing value of 'nameToRemove' in their with classes
// and replaces 'nameToRemove' with value of 'nameToAdd'
window.vCWeather.replaceClassName = function (nameToRemove, nameToAdd) {
    var elem;
    var elements = document.getElementsByClassName(nameToRemove);

    for (var i = (elements.length-1); i >= 0; i--) {
        elem = elements[i];
        elem.className = elem.className.replace(nameToRemove, '');
        elem.className = elem.className.replace(/^ | $/gi, '');
        elem.className = elem.className + ' ' + nameToAdd;
    }
};


