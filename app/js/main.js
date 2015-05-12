
function time(){
var d = new Date();

var hh = d.getHours();

var dayPart;
  if(hh <= 12) {
    dayPart = "am";}
    else{
      dayPart = "pm";
    }
   if(hh > 12)hh -= 12;

var mm = d.getMinutes();
  if(mm < 10){
    mm = "0" + mm;
  }

console.log(hh + ":" + mm + " " + dayPart);
}

function dates(){
  var d = new Date();

  var date = d.getDate();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDay();

  switch(month){
    case 0: month = "January";
      break;
    case 1: month = "February";
      break;
    case 2: month = "March";
      break;
    case 3: month = "April";
      break;
    case 4: month = "May";
      break;
    case 5: month = "June";
      break;
    case 6: month = "July";
      break;
    case 7: month = "August";
      break;
    case 8: month = "September";
      break;
    case 9: month = "October";
      break;
    case 10: month = "November";
      break;
    case 11: month = "December";
      break;
  }

  switch(day){
    case 0: day = "Sun";
      break;
    case 1: day = "Mon";
      break;
    case 2: day = "Tue";
      break;
    case 3: day = "Wed";
      break;
    case 4: day = "Thu";
      break;
    case 5: day = "Fri";
      break;
    case 6: day = "Sat";
      break;

  }
  console.log(date + "." + month + "." + year + "  " + day);

  }

  dates();


setInterval(time, 10000);


function main(){
    var loginForm = document.forms[0];
    var loginFormOut = document.forms[1];
    var loginFormOutMobile = document.forms[2];
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
        var logoutRequest = new XMLHttpRequest();
        logoutRequest.open('GET', '/logout', true);
        logoutRequest.send();
        console.log(logoutRequest);

        // deleteCookie("login");
        mainPage.parentNode.classList.add("hide");
        mainPage.classList.remove("hide");
        window.location.reload();
        return false;
    }

    function checkDuration(){
        var delayBeforeQuit = 1800 * 1000;
        var curTime = new Date();
        // console.log("remained time after last action:" +(curTime - startTime)/1000 + " s");
        if(curTime - startTime > delayBeforeQuit){
            logOut();
        }
    }


    if(getCookie("login")){
        loginPage.classList.add("hide");
        mainPage.classList.remove("hide");
    }


    function logIn(){
        var loginRequest = new XMLHttpRequest();

        startTime = new Date();
        var login = this.elements.login.value;
        var password = this.elements.password.value;

        loginRequest.open('GET', '/login?' + "login=" + login + "&" + "password=" + password, true);
        loginRequest.send();
        console.log(loginRequest);
        console.log(getCookie('login'));

        if(getCookie('login')){

        userName.innerHTML = login;
        expire30 = setInterval(checkDuration, 500);
        loginPage.classList.add("hide");
        mainPage.classList.remove("hide");
        }

        return false;
    }

    loginForm.onsubmit = logIn;
    loginFormOut.onsubmit = logOut;
    loginFormOutMobile.onsubmit = logOut;

}

ready(main);
