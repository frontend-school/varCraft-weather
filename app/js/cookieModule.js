var cookieModule = (function () {
    return {
        writeCookie: function (name, value, time) {
            var expires = "",
                date = null;
            if (time) {
                date = new Date();
                date.setTime(date.getTime() + time);
                expires = "; expires=" + date.toUTCString();
            }

            document.cookie = name + "=" + value + expires + "; path=/";
        },
        readCookie: function (name) {
            var searchName = name + "=",
                cookie = document.cookie.split(';');

            for (var i = 0; i < cookie.length; i++) {
                var c = cookie[i];

                while(c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(searchName) == 0) {
                    return c.substring(searchName.length, c.length);
                }
            }

            return null;
        },
        eraseCookie: function (name) {
            cookieModule.writeCookie(name, "", -1);
        }
    }
}());


