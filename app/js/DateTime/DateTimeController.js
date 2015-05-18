window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.DateTimeController = (function () {
    var _date = new Date(),
        _model,
        _view;

    var _dateTimeSetter = function () {
        _model.setTime(_date);
        _model.setDate(_date);

        setTimeout(function () {
            // renew date
            _date = new Date();

            // if new day become
            if (_date.getHours() === 0) {
                _model.setDate(_date);
            }

            // update model
            _model.setTime(_date);

            setInterval(function () {
                _date = new Date();

                // if new day become
                if (_date.getHours() === 0) {
                    _model.setDate(_date);
                }

                _model.setTime(_date);

            }, 1000 * 60);

        }, (60 - _date.getSeconds()) * 1000);
    };


    // start module
    var _start = function () {
        // run view and model
        _model = window.VarCraft.modules.DateTimeModel;

        _view = window.VarCraft.modules.DateTimeView;
        _view.start();

        // start updater
        _dateTimeSetter();
    };

    return {
        start: _start
    };

})();