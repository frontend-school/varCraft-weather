window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.facadeRequest = (function () {
    function getSync(theUrl) {
        var xmlHttp = new XMLHttpRequest();

        //xmlHttp.withCredentials = true;
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);

        return xmlHttp.responseText;
    }

    function getAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.withCredentials = true;

        xmlHttp.onload = callback;
        xmlHttp.open('GET', theUrl, true);
        xmlHttp.send();
    }

    return {
        httpGet: getSync,
        getAsync: getAsync
    };
}());

