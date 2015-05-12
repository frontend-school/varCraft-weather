
window.onload = function() {
    var timer = new Timer();
    timer.setLogoutController( new LogoutController() );

    var loginController = new LoginController(timer);
    var logoutController = new LogoutController(timer);

    // adding button listeners
    (function () {
        var LOGGING_BTN_CLASSES = window.vCWeather.CONST.CLASSES_BUTTONS;

        var elements = document.getElementsByClassName(LOGGING_BTN_CLASSES.LOG_IN);
        if (elements.length)
            elements[0].addEventListener( 'click', function(ev){ loginController.logIn(ev, false); } );

        elements = document.getElementsByClassName(LOGGING_BTN_CLASSES.LOG_OUT);
        if (elements.length)
            elements[0].addEventListener('click', function(ev){ logoutController.logOut(ev, false); } );

    }());

    // search logging in sessionStorage
    (function () {

        var storageController = new StorageController();
        if (storageController.isLogged())
            loginController.logIn( null, true, storageController.getLoggedName() );

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
