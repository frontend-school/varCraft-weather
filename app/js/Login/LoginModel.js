window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.LoginModel = (function () {
    // false - log out
    // true - log in
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


