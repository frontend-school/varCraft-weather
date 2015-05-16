window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateModel = (function () {
    var date = new Date();

    return {
        getDate : function () {
            return date;
        },
        setDate : function (newDate) {
            date = newDate;
            window.MYAPPLICATION.pubsub.publish('/timeChange', {});
            if (date.getHours() === 0 && date.getHours() === 0) {
                window.MYAPPLICATION.pubsub.publish('/dateChange', {});
            }
        }
    };
}());
