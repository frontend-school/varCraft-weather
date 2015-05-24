
(function (namespace) {
    var modules = namespace.modules;

    function DateTimeUpdaterView(model, elements) {
        this._model = model;
        this._elements = elements;

        var self = this;

        this._model.timeChanged.attach(function (args) {
            self.updateTime(args.date);
        });
        this._model.dayChanged.attach(function (args) {
            self.updateDays(args.date);
        });
    }
    DateTimeUpdaterView.prototype = {
        updateTime: function (date) {
            this._elements.time.innerHTML = ( (date.getHours() === 12) ? 12 : (date.getHours() % 12) ) + ':' + date.getMinutes();
            this._elements.timePeriod.innerHTML = (date.getHours() < 12) ? 'AM' : 'PM';
        },
        updateDays: function (date) {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            var yesterday = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1);
            var tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);

            this._elements.day.innerHTML = days[date.getDay()].slice(0, 3) +
                ', ' + months[date.getMonth()] + ' ' + date.getDate();

            this._elements.dayList.yesterday.innerHTML = yesterday.getDate() + '/' + (yesterday.getMonth()+1) + '/' + yesterday.getFullYear();
            this._elements.dayList.today.innerHTML = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
            this._elements.dayList.tomorrow.innerHTML = tomorrow.getDate() + '/' + (tomorrow.getMonth()+1) + '/' + tomorrow.getFullYear();
        }
    };

    modules.DateTimeUpdaterView = DateTimeUpdaterView;
})(window.vCWeather);