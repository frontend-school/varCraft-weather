window.vCWeather = window.vCWeather || {};
window.vCWeather.modules = window.vCWeather.modules || {};

//= Constants.js

//= StorageController.js
//= Timer.js

//= Event.js
//= DateTimeUpdater/DateTimeModel.js
//= DateTimeUpdater/DateTimeView.js
//= DateTimeUpdater/DateTimeController.js

//= PubSub.js

//= Login/LoginModel.js
//= Login/LoginView.js
//= Login/LoginController.js

//= Logout/LogoutModel.js
//= Logout/LogoutView.js
//= Logout/LogoutController.js

//= Mediator.js

window.onload = function() {

    var mediator = new window.vCWeather.modules.Mediator();

    var timer = new window.vCWeather.modules.Timer();
    /*timer.setLogoutController( new LogoutController() );

    var loginController = new LoginController(timer);
    var logoutController = new LogoutController(timer);

    // adding button listeners
    (function () {
        var LOGGING_CONTROLS_CLASSES = window.vCWeather.CONST.CLASSES_LOGGING_CONTROLS;

        var elements = document.getElementsByClassName(LOGGING_CONTROLS_CLASSES.LOG_OUT);
        if (elements.length) {
            elements[0].addEventListener('click', function (ev) {
                window.vCWeather.sendRequestToServer('/logout', {}, function () {
                    logoutController.logOut(ev, false);
                });
            });
        }
    }());*/

    // search logging in sessionStorage
    /*(function () {

        var storageController = new StorageController();
        if (storageController.isLogged()) {
            loginController.logIn(null, true, storageController.getLoggedName());
        }

    })();*/

    // DateTimeUpdater to display the current time
    (function () {
        var elements = {
            time: window.document.querySelector('.' + window.vCWeather.CONST.CLASSES_DAY_TIME.TIME),
            timePeriod: window.document.querySelector('.' + window.vCWeather.CONST.CLASSES_DAY_TIME.TIME_PERIOD),
            day: window.document.querySelector('.' + window.vCWeather.CONST.CLASSES_DAY_TIME.DAY),
            dayList: {
                yesterday: window.document.querySelector('.' + window.vCWeather.CONST.CLASSES_DAY_TIME.DAY_LIST.DAY_YESTERDAY),
                today: window.document.querySelector('.' + window.vCWeather.CONST.CLASSES_DAY_TIME.DAY_LIST.DAY_TODAY),
                tomorrow: window.document.querySelector('.' + window.vCWeather.CONST.CLASSES_DAY_TIME.DAY_LIST.DAY_TOMORROW)
            }
        };

        var dateTimeUpdaterModel = new vCWeather.modules.DateTimeUpdaterModel();
        var dateTimeUpdaterView = new vCWeather.modules.DateTimeUpdaterView(dateTimeUpdaterModel, elements);
        var dateTimeUpdaterController = new vCWeather.modules.DateTimeUpdaterController(dateTimeUpdaterModel, dateTimeUpdaterView);

        dateTimeUpdaterController.init();
    })();

}; /* window.onload */

window.vCWeather = window.vCWeather || {};
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

window.vCWeather.sendRequestToServer = function (uri, params, successCallback) {
    var request = new XMLHttpRequest();

    var paramsInString = '';

    params = params || {};
    for (var paramKey in params) {
        paramsInString = paramsInString + /*( (paramsInString === '') ? '' : '&') +*/
            '&' + paramKey + '=' + params[paramKey];
    }
    paramsInString = paramsInString.replace("&","?");

    request.open('GET', window.vCWeather.CONST.SERVER.ADDRESS + uri + paramsInString, true);
    request.onreadystatechange = processReqChange;
    request.send();

    function processReqChange()
    {
        //try {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log('Your request ', request);

                    successCallback();
                } else {
                    alert('Getting data failed: ' + request.statusText);
                }
            }
        //}
        //catch( e ) {
        //    alert('Error: ' + e.description);
        //
        //    console.log(e);
        //}
    }
};
