window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateModel = (function () {
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
            window.MYAPPLICATION.pubsub.publish('/timeChange', _getDate());
            if (date.getHours() === 0 && date.getHours() === 0) {
                window.MYAPPLICATION.pubsub.publish('/dateChange', _getDate());
            }
        }
    };
}());
