window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LogoutModel = (function (exports) {
    var status = true;

    function _getStatus() {
        return status;
    }

    return {
        getStatus :  _getStatus,
        setStatus : function () {
            status = false;
            exports.pubsub.publish('/logOut', {});
        }
    };
}(window.MYAPPLICATION));