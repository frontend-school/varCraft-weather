window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.DateTimeController = (function () {

    // start module
    var _start = function () {
        addEventListener("load", function () {
            // run view and model
            window.VarCraft.modules.DateTimeView.start();
            window.VarCraft.modules.DateTimeModel.start();
        });
    };

    return {
        start: _start
    };

})();

window.VarCraft.modules.DateTimeController.start();

