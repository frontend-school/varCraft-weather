window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.TimeDateController = (function (exports) {
    function _timeCount() {
        var model = exports.TimeDateModel;

        model.setDate(new Date());
        setTimeout(function () {
            _timeCount();
        }, 1000 * 60);
    }

    function _startView(formatTime, formatDiem, formatDate, formatWeatherDate) {
        var view = exports.TimeDateView;

        view.start(formatTime, formatDiem, formatDate, formatWeatherDate);
    }

    return {
        start : function (formatTime, formatDiem, formatDate, formatWeatherDate) {
            _startView(formatTime, formatDiem, formatDate, formatWeatherDate);
            _timeCount();
        }
    };
}(window.MYAPPLICATION));
