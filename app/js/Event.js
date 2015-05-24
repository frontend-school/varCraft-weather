
(function (namespace) {
    function Event() {
        this._listeners = [];
    }
    Event.prototype = {
        attach: function (listener) {
            this._listeners.push(listener);
        },
        notify: function (args) {
            var index;

            for (index = 0; index < this._listeners.length; index += 1) {
                this._listeners[index](args);
            }
        }
    };
    namespace.modules.Event = Event;
})(window.vCWeather);
