
(function (namespace) {
    var CONST = namespace.CONST;
    var modules = namespace.modules;

    function DateTimeUpdaterModel() {
        this._date = new Date();

        this.dayChanged = new modules.Event();
        this.timeChanged = new modules.Event();
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

    modules.DateTimeUpdaterModel = DateTimeUpdaterModel;
})(window.vCWeather);
