window.varCraft = window.varCraft || {};
window.varCraft.mediator =  window.varCraft.mediator || {};

window.varCraft.mediator = (function() {
    var subscribe = function(channel, fn) {
        if (!varCraft.mediator.channels[channel]) varCraft.mediator.channels[channel] = [];
        varCraft.mediator.channels[channel].push({ context: this, callback: fn });
        return this;
    },

    publish = function(channel) {
        if (!varCraft.mediator.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = varCraft.mediator.channels[channel].length; i < l; i++) {
            var subscription = varCraft.mediator.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    return {
        channels: {},
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };

}());