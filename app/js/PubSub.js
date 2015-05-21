window.vCWeather = window.vCWeather || {};
window.vCWeather.modules = window.vCWeather.modules || {};

(function (namespace) {
    function PubSub() {
        /*key_stream = "string"; value_stream = [{id, callbacks}]*/
        this._streams = {};
        var counterId = 0;

        this._IdTo = function () {
            counterId++;
            return counterId;
        };
    }
    PubSub.prototype.subscribe = function (stream, callback) {
        var id = this._IdTo();

        if (!this._streams[stream]) {
            this._streams[stream] = [];
        }
        this._streams[stream].push( {'id': id, 'callback': callback} );

        return id;
    };
    PubSub.prototype.unsubscribe = function (subscriberId) {
        var stream_value;
        var deleted = false;
        for (var stream_key in this._streams) {

            stream_value = this._streams[stream_key];
            for (var i = 0; i < stream_value.length; i++) {
                if (stream_value[i].id === subscriberId) {
                    stream_value[i].splice(i, 1);
                    deleted = true;
                    break;
                }
            }

            if (deleted) {
                break;
            }
        }
    };
    PubSub.prototype.publish = function (stream, data) {
        if (!this._streams[stream]) {
            return false;
        }

        this._streams[stream].forEach(function (item) {
            item.callback(data);
        });
    };
    PubSub.prototype.applyTo = function (obj) {
        if (typeof obj !== 'undefined') {
            obj.publish = this.publish;
            obj.subscribe = this.subscribe;
        }
    };

    namespace.pubsub = new PubSub();
    namespace.PubSub = PubSub;
})(window.vCWeather.modules);