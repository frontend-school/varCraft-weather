
function LogoutController(timer) {
  var _storageController = new StorageController();

  function _setLoggingName(loggingName) {
    var elements = document.getElementsByClassName('js-login-name');
    if (elements.length)
      elements[0].value = loggingName;
  }

  this.logOut = function (ev, skipPreventing) {
    // 1. show block, restore login; 2. stop timer; 3. clear logs; 4. remove handlers
    var CLASSES_LOGGING = window.vCWeather.CONST.CLASSES_LOGGING;

    window.vCWeather.replaceClassName(CLASSES_LOGGING.TO_HIDE_BLOCK, CLASSES_LOGGING.TO_SHOW_BLOCK);
    _setLoggingName( _storageController.getLoggedName() ); // covers case if reload was

    _storageController.clearLogs();

    if (timer !== undefined) {
      timer.stopWatchingInactivity();
      this.stopActivityListening( timer.processActivityListening );
    }

    if (!skipPreventing)
      ev.preventDefault();
  }

  this.stopActivityListening = function (handler) {
    document.removeEventListener('mousemove', handler);
    document.removeEventListener('keydown', handler);
  }
}
