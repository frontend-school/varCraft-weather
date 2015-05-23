window.varCraft = window.varCraft || {};
window.varCraft.services = window.varCraft.services || {};
window.varCraft.services.xhr = window.varCraft.services.xhr || {};

window.varCraft.services.xhr = (function(exports){
    return {
        getAsync: function(url, callback){
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onload = callback;

            xhr.open('GET', url, true);
            xhr.send();
        },
        getSync: function(url, callback){
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.onload = callback;

            xhr.open('GET', url, false);
            xhr.send();
        }
    }

})(window.varCraft);