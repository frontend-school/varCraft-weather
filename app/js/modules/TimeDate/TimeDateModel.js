window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateModel = (function (exports) {
    var date = new Date();

    function _getDate() {
        return date;
    }

    return {
        getDate : function () {
            return _getDate();
        },
        setDate : function (newDate) {
            date = newDate;
            exports.pubsub.publish('/timeChange', _getDate());
            if (date.getHours() === 0 && date.getHours() === 0) {
                exports.pubsub.publish('/dateChange', _getDate());
            }
        }
    };
}(window.MYAPPLICATION));
