window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateController = (function () {
    function _timeCount() {
        var model = window.MYAPPLICATION.TimeDateModel;

        model.setDate(new Date());
        setTimeout(function () {
            _timeCount();
        }, 1000 * 60);
    }

    function _startView() {
        var view = window.MYAPPLICATION.TimeDateView;

        view.start();
    }

    return {
        start : function () {
            _startView();
            _timeCount();
        }
    };
}());
