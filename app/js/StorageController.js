
function StorageController() {
  this.sessionKeys = {lastLoggedName: 'lastLoggedName',
                     endIfInactivityAt: 'endIfInactivityAt'};
}
StorageController.prototype.clearLogs = function () {
  for (var key in this.sessionKeys)
    sessionStorage.removeItem( this.sessionKeys[key] );
};
// supposed timeLeft in milliseconds
StorageController.prototype.setEndIfInactivityAt = function (timeLeft) {
  sessionStorage.setItem( this.sessionKeys.endIfInactivityAt, (new Date(Date.now() + timeLeft)).toISOString() );
};
StorageController.prototype.setLoggedName = function (lastLoggedName) {
  lastLoggedName = ( (lastLoggedName === undefined) ? '' : lastLoggedName);
  sessionStorage.setItem(this.sessionKeys.lastLoggedName, lastLoggedName);
};
StorageController.prototype.setLogs = function (lastLoggedName, timeLeft) {
  this.setLoggedName(lastLoggedName);
  this.setEndIfInactivityAt(timeLeft);
};
StorageController.prototype.getLoggedName = function () {
  return sessionStorage.getItem(this.sessionKeys.lastLoggedName);
};
StorageController.prototype.isLogged = function () {
  if ( sessionStorage.getItem(this.sessionKeys.lastLoggedName) !== undefined
    && sessionStorage.getItem(this.sessionKeys.endIfInactivityAt) !== undefined ) {
    return ( new Date(sessionStorage.getItem(this.sessionKeys.endIfInactivityAt)) > new Date() );
  }
  return false;
};
