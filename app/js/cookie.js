function writeCookie(name, value, time) {
    var expires = "";
    if (time) {
        var date = new Date();
        date.setTime(date.getTime() + time);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var searchName = name + "=";
    var cookie = document.cookie.split(';');

    for ( var i = 0; i < cookie.length; i++) {
        var c = cookie[i];

        while(c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(searchName) == 0) {
            return c.substring(searchName.length, c.length);
        }
    }

    return null;
}

function eraseCookie(name) {
    writeCookie(name, "", -1);
}
