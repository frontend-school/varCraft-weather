window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutModel = (function () {
    var status = true;

    function _getStatus() {
        return status;
    }

    return {
        getStatus : function () {
            return _getStatus();
        },
        setStatus : function () {
            status = false;
            window.MYAPPLICATION.pubsub.publish('/logOut', {});
        }
    };
}());