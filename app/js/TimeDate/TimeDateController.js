window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateController = (function () {
    var currentDate = null;

    function _timeCount() {
        var model = window.MYAPPLICATION.TimeDateModel;
        currentDate = model.getDate();

        model.setDate(new Date());//not logic
        setTimeout(function () {
            _timeCount();
        }, 1000 * 60);
    }

    function _writeDates() {
        var view = window.MYAPPLICATION.TimeDateView;

        view.writeTime(currentDate);
        view.writeAllDates(currentDate);
    }

    return {
        timeCount : function () {
            _timeCount();
            _writeDates(currentDate);
        }
    };
}());
