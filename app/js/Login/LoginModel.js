window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.LoginModel = (function () {
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
            window.MYAPPLICATION.pubsub.publish('/logIn', user);
        }
    };
}());