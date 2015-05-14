
window.vCWeather = window.vCWeather || {};
window.vCWeather.modules = window.vCWeather.modules || {};

window.vCWeather.CONST = window.vCWeather.CONST || {};

(function (namespace) {
    var CONST = window.vCWeather.CONST;

    function DateTimeUpdaterModel() {
        this._date = new Date();

        this.dayChanged = new namespace.Event();
        this.timeChanged = new namespace.Event();
    }
    DateTimeUpdaterModel.prototype = {
        _updateDate: function () {
            this._date = new Date();

            this.timeChanged.notify({date: this._date});
            if (this._date.getHours() === 0) {
                this.dayChanged.notify({date: this._date});
            }
        },
        init: function () {
            this._date = new Date();

            this.timeChanged.notify({date: this._date});
            this.dayChanged.notify({date: this._date});

            var _this = this;
            setInterval(function () {
                _this._updateDate();
            }, CONST.ONE_MINUTE_MS - _this._date.getSeconds() * 1000);
        }
    };

    namespace.DateTimeUpdaterModel = DateTimeUpdaterModel;
})(window.vCWeather.modules);
