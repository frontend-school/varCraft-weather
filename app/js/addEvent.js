window.varCraft = window.varCraft || {};

window.varCraft.services.Event = (function(){
    return {
        addEvent: function(el, type, fn){
            if (window.addEventListener) {
                el.addEventListener(type, fn, false);
            }
            else if (window.attachEvent) {
                el.attachEvent('on' + type, fn);
            }
            else {
                el['on' + type] = fn;
            }
        },
        stopPropagation: function(e){
            if (ev.stopPropagation) {
                e.stopPropagation();
            }
            else {
                e.cancelBubble = true;
            }
        },
        preventDefault: function(e){
            if (e.preventDefault) {
                e.preventDefault();
            }
        }
    }
})(window.varCraft);

function addEvent(el, type, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if (window.attachEvent) {
        el.attachEvent('on' + type, fn);
    }
    else {
        el['on' + type] = fn;
    }
}