window.varCraft = window.varCraft || {};
window.varCraft.services = window.varCraft.services || {};
window.varCraft.services.cookie = window.varCraft.services.cookie || {};
window.varCraft.services.Event = window.varCraft.services.Event || {};

varCraft.services.cookie.getCookie= function(name) {
      var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    };

varCraft.services.cookie.setCookie = function(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    if (!options.hasOwnProperty(propName)) continue;
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
};

varCraft.services.cookie.deleteCookie = function(name) {
  varCraft.services.cookie.setCookie(name, "", {
    expires: -1
  });
};


varCraft.services.Event = {
  add: function(elem, type, handler){
        if (elem.addEventListener){
          elem.addEventListener(type, handler, false)
        }
        else {
          elem.attachEvent("on"+type, handler)
        }
      },
  remove: function(elem, type, handler){
        if (elem.removeEventListener){
          elem.addEventListener(type, handler, false)
        }
        else {
          elem.removeEvent("on"+type, handler)
        }
      }

}

varCraft.services.DOM = {
}