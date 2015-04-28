window.MYAPPLICATION.helperModule = (function () {
    return {
        getElement: function (name) {
            return document.getElementById(name);
        }
    };
}());