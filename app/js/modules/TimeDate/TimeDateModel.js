window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateModel = (function (exports) {
    var date = null;

    function _getDate() {
        return date;
    }

    return {
        getDate : function () {
            return _getDate();
        },
        setDate : function (newDate) {
            var prevDate = date;
            date = newDate;
            exports.pubsub.publish('/timeChange', _getDate());
            if (prevDate === null || (date.getHours() === 0 && date.getMinutes() === 0)) {
                exports.pubsub.publish('/dateChange', _getDate());
            }
        }
    };
}(window.MYAPPLICATION));
