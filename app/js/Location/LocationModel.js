window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.LocationModel = (function () {
    var CONST = window.VarCraft.CONST,
        _location = {};

    var _getLocation = function () {
        return _location;
    };

    var _setLocation = function (city, country) {
        _location.city = city;
        _location.country = country;
        window.modules.pubsub.publish(CONST.ACTION.SET_LOCATION, _location);
    };

    return {
        getLocation: _getLocation,
        setLocation: _setLocation
    };
})();


