window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

// view
window.VarCraft.modules.LogoutModel = (function () {
    // false - log in
    // true - log out
    var _state = false;

    var _getState = function () {
        return _state;
    };

    var _setState = function (st) {
        _state = st;
    };

    return {
        getState: _getState,
        setState: _setState
    };
})();


