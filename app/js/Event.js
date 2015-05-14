
window.vCWeather = window.vCWeather || {};
window.vCWeather.modules = window.vCWeather.modules || {};

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
    namespace.Event = Event;
})(window.vCWeather.modules);
