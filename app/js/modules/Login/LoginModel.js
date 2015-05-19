window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginModel = (function (exports) {
    var status = false;

    function _getStatus() {
        return status;
    }

    return {
        getStatus : function () {
            return _getStatus();
        },
        setStatus : function (user) {
            status = true;
            exports.pubsub.publish('/logIn', user);
        }
    };
}(window.MYAPPLICATION));