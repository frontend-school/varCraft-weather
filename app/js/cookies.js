window.VarCraft = window.VarCraft || {};
window.VarCraft.modules = window.VarCraft.modules || {};

window.VarCraft.modules.Cookies = (function () {
    // get cookie by name || undefined
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // set cookie by name and add duration
    function setCookie(name, value, expires) {

        value = encodeURIComponent(value);

        // set expire by seconds value
        var d = new Date();
        d.setTime(d.getTime() + expires);
        expires = d.toUTCString();

        // update cookies
        var updatedCookie = name + "=" + value + "; expires=" + expires;
        document.cookie = updatedCookie;
    }

    return {
        set: function(name, value, expires) {
            return setCookie(name, value, expires);
        },

        get: function(name) {
            return getCookie(name);
        }
    };
})();