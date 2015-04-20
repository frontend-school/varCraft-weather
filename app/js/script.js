
window.onload = function() {

  var loggingProccessor = getLoggingProccessor();

  // adding button listeners
  (function () {

    var elements = document.getElementsByClassName('js-log-in');
    if (elements.length)
      elements[0].addEventListener( "click", function(ev){ loggingProccessor.logIn(ev, false); } );

    elements = document.getElementsByClassName('js-log-out');
    if (elements.length)
      elements[0].addEventListener("click", function(ev){ loggingProccessor.logOut(ev, false); } );

  })();

  // search logging in sessionStorage
  (function () {

    var storageProcessor = getStorageProcessor();

    if (storageProcessor.isLogged())
      loggingProccessor.logIn( null, true, storageProcessor.getLoggedName() );

  })();

}; /* window.onload */

function getLoggingProccessor() {

  var timerOffId;
  var storageProcessor = getStorageProcessor();

  var timeOffLimit = 30 * 1000;
  var timeLeft;
  var timeDeltaOff = 1000;

  var loggingProccessor = {};
  loggingProccessor.logIn = function (ev, skipPreventing, loggedName) {

    var loggingName = getLoggingName() || loggedName;
    setHelloMessage(loggingName);

    replaceClassName('popup__overlay_show-block', 'popup__overlay_hide-block');

    startActivityListening();

    storageProcessor.setLogs(loggingName, timeOffLimit);

    // Time controlling algorithm
    resetTimeLeft();
    // Start timer back
    timerOffId = setInterval(function() {

      if (timeLeft < timeDeltaOff) {
        timeLeft = 0;
        loggingProccessor.logOut(null, true);
      } else {
        timeLeft = timeLeft - timeDeltaOff;
        // restore handler, which can be removed if an activity was
        startActivityListening();
        // Write in sessionStorage
        storageProcessor.setLogs(loggingName, timeLeft);
      }

      var elements = document.getElementsByClassName('js-timer');
      if (elements.length) {
        document.getElementsByClassName('js-timer')[0].innerHTML =
                   'Being inactive you can stay logged in ' + timeLeft / 1000 + ' sec. \
                    After you will be logged out.';
      };

    }, timeDeltaOff); /*setInterval()*/

    if (!skipPreventing)
      ev.preventDefault();
  }; /* logIn() */

  loggingProccessor.logOut = function (ev, skipPreventing) {
    // 1. show block, restore login; 2. clear listeners; 3. stop timer; 4. clear logs;
    replaceClassName('popup__overlay_hide-block', 'popup__overlay_show-block');
    setLoggingName( storageProcessor.getLoggedName() ); // covers case if reload was

    stopActivityListening();

    clearInterval(timerOffId);

    storageProcessor.clearLogs();

    if (!skipPreventing)
      ev.preventDefault();
  };

  function startActivityListening() {

    var processActivityListening = function () {
      resetTimeLeft();
      stopActivityListening();
    }

    document.onmousemove = processActivityListening;
    document.onkeydown = processActivityListening;
  }

  function stopActivityListening() {
    document.onmousemove = null;
    document.onkeydown = null;
  }

  function resetTimeLeft() {
      timeLeft = timeOffLimit;
  };

  return loggingProccessor;
} /* getLoggingProccessor() */


function getLoggingName() {

  var elements = document.getElementsByClassName('js-login-name');
  if (elements.length)
    return elements[0].value;
  return undefined;
}

function setLoggingName(loggingName) {

  var elements = document.getElementsByClassName('js-login-name');
  if (elements.length)
    elements[0].value = loggingName;
}

function setHelloMessage(loggingName){

  var elements = document.getElementsByClassName('js-hallo-message');
  if (elements.length)
    elements[0].innerHTML = 'Hallo, ' + ( (loggingName) ? (loggingName) : ('unnamed') ) + '!';
}

// Searches elements containing value of 'nameToRemove' in their with classes
// and replaces 'nameToRemove' with value of 'nameToAdd'
function replaceClassName(nameToRemove, nameToAdd) {
  var elem;
  var elements = document.getElementsByClassName(nameToRemove);

  for (var i = (elements.length-1); i >= 0; i--) {
    elem = elements[i];
    elem.className = elem.className.replace(nameToRemove, '');
    elem.className = elem.className.replace(/^ | $/gi, '');
    elem.className = elem.className + ' ' + nameToAdd;
  }
}

function getStorageProcessor() {

  var sessionKeys = {lastLoggedName: 'lastLoggedName',
                     endIfInactivityAt: 'endIfInactivityAt'};
  var storageProcessor = {};

  storageProcessor.clearLogs = function () {
    for (var key in sessionKeys)
      sessionStorage.removeItem( sessionKeys[key] );
  };

  // supposed timeLeft in milliseconds
  storageProcessor.setLogs = function (lastLoggedName, timeLeft) {
    lastLoggedName = ( (lastLoggedName == undefined) ? '' : lastLoggedName);
    sessionStorage.setItem(sessionKeys.lastLoggedName, lastLoggedName);
    sessionStorage.setItem( sessionKeys.endIfInactivityAt, (new Date(Date.now() + timeLeft)).toISOString() );
  };

  storageProcessor.getLoggedName = function () {
    return sessionStorage.getItem(sessionKeys.lastLoggedName);
  };

  storageProcessor.isLogged = function () {
    if ( sessionStorage.getItem(sessionKeys.lastLoggedName) != undefined
        && sessionStorage.getItem(sessionKeys.endIfInactivityAt) != undefined ) {
      return ( new Date(sessionStorage.getItem(sessionKeys.endIfInactivityAt)) > new Date );
    }

    return false;
  };

  return storageProcessor;
}
