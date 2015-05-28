window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

// view
window.VarCraft.modules.LocationView = (function () {
    var CONST = window.VarCraft.CONST,
        _cityLabel = document.querySelector(CONST.SELECTORS.CITY),
        _countryLabel = document.querySelector(CONST.SELECTORS.COUNTRY);

    var _setCityCountry = function (location) {
        _cityLabel.innerHTML = location.city;
        _countryLabel.innerHTML = location.country;
    };

    var _start = function () {
        window.modules.pubsub.subscribe(CONST.ACTION.SET_LOCATION, _setCityCountry);
    };

    return {
        start: _start
    };
})();


