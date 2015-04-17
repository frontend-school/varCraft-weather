function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


function main(){
	var loginForm = document.forms[0];
	var loginFormOut = document.forms[1];
	var dataBase = {login: "Viktor", password: "1"};
	var cookieOptions = {
		path: "/",
		expires: 3600,
		domain: ""
	};

	var startTime = new Date();

	if(getCookie("login")){
	var expire30 = setInterval(checkDuration, 500);}

	function logOut(){
		deleteCookie("login");
		loginFormOut.parentNode.classList.add("hide");
		loginForm.parentNode.classList.remove("hide");
		window.location.reload();
		return false;
	}

	function checkDuration(){
		var delayBeforeQuit = 1800 * 1000;
		var curTime = new Date();
		console.log(curTime - startTime);
		if(curTime - startTime > delayBeforeQuit){
			logOut();
		}
	}


	if(getCookie("login")){
		loginForm.parentNode.classList.add("hide");
		loginFormOut.parentNode.classList.remove("hide");
	}

	function checkLogin(login, password, dataBase){
		if(login == dataBase.login && password == dataBase.password) return true;
		return false;
	}


	loginForm.onsubmit = function(){
		startTime = new Date();
		var login = this.elements.login.value;
		var password = this.elements.password.value;

		if(!checkLogin(login, password, dataBase)){
			window.location.reload();
			return false;
		}

		alert("Hello, " + login + "!");
		expire30 = setInterval(checkDuration, 500);

		setCookie("login", login, cookieOptions);

		this.parentNode.classList.add("hide");
		loginFormOut.parentNode.classList.remove("hide");

		return false;
	}

	loginFormOut.onsubmit = logOut;


	function getCookie(name) {
		  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		  ));
		  return matches ? decodeURIComponent(matches[1]) : undefined;
		}

	function setCookie(name, value, options) {
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
	    updatedCookie += "; " + propName;
	    var propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += "=" + propValue;
	    }
	  }

	  document.cookie = updatedCookie;
	}

	function deleteCookie(name) {
	  setCookie(name, "", {
	    expires: -1
	  })
	}


}

ready(main);
