window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateController = (function (exports) {
    function _timeCount() {
        var model = exports.TimeDateModel;

        model.setDate(new Date());
        setTimeout(function () {
            _timeCount();
        }, 1000 * 60);
    }

    function _startView() {
        var view = exports.TimeDateView;

        view.start();
    }

    return {
        start : function () {
            _startView();
            _timeCount();
        }
    };
}(window.MYAPPLICATION));
