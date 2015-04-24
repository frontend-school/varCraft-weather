function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
  	window.onload = fn;
     // document.addEventListener('DOMContentLoaded', fn);
  }
}


function main(){
	var loginForm = document.forms[0];
	var loginFormOut = document.forms[1];
	var loginPage = loginForm.parentNode;
	var mainPage = document.querySelector('.js-main-page');
	var userName = mainPage.querySelector('.js-user-name');

	var dataBase = [{login: "Viktor", password: "1"}, {login: "Maksim", password: "1"}, {login: "Stas", password: "1"}];
	var cookieOptions = {
		path: "/",
		expires: 36000,
		domain: ""
	};

	var startTime = new Date();

	if(getCookie("login")){
	var expire30 = setInterval(checkDuration, 500);
	userName.innerHTML = getCookie("login");
	}

	function logOut(){
		deleteCookie("login");
		mainPage.parentNode.classList.add("hide");
		mainPage.classList.remove("hide");
		window.location.reload();
		return false;
	}

	function checkDuration(){
		var delayBeforeQuit = 1800 * 1000;
		var curTime = new Date();
		console.log("remained time after last action:" +(curTime - startTime)/1000 + " s");
		if(curTime - startTime > delayBeforeQuit){
			logOut();
		}
	}


	if(getCookie("login")){
		loginPage.classList.add("hide");
		mainPage.classList.remove("hide");
	}

	function checkLogin(login, password, dataBase){
		// for(var i = 0; i < dataBase.length; i++){
		// 	if(login == dataBase[i].login && password == dataBase[i].password) return true;
		// }
		// return false;
		return true;
	}


	loginForm.onsubmit = function(){
		startTime = new Date();
		var login = this.elements.login.value;
		var password = this.elements.password.value;

		if(!checkLogin(login, password, dataBase)){
			window.location.reload();
			return false;
		}

		userName.innerHTML = login;
		expire30 = setInterval(checkDuration, 500);

		setCookie("login", login, cookieOptions);

		loginPage.classList.add("hide");
		mainPage.classList.remove("hide");

		return false;
	};

	loginFormOut.onsubmit = logOut;




}

ready(main);
