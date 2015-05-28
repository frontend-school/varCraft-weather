window.VarCraft = window.VarCraft || {};

window.VarCraft.DateTimeFormat = (function () {
    var _checkDateTime = function (item) {
        if (item < 10) {
            item = "0" + item;
        }
        return item;
    };

    return {
        checkDateTime: _checkDateTime
    };
})();

