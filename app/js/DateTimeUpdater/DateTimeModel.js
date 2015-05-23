
(function (namespace) {
    var CONST = window.vCWeather.CONST;
    var modules = window.vCWeather.modules;

    function DateTimeUpdaterModel() {
        this._date = new Date();

        this.dayChanged = new namespace.Event();
        this.timeChanged = new namespace.Event();
    }

    DateTimeUpdaterModel.prototype = {
        setDate: function (date) {
            this._date = date || new Date();

            this.timeChanged.notify({date: this._date});
            if (this._date.getHours() === 0) {
                this.dayChanged.notify({date: this._date});
            }
        },
        getDate: function () {
            return this._date;
        }
    };

    namespace.DateTimeUpdaterModel = DateTimeUpdaterModel;
})(window.vCWeather.modules);
