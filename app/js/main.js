//Data User MVC


function main(){

    var viewUserInfo = {
        insertName: function(name){
        var userName = document.querySelector('.js-user-name');
        console.log("это userName",userName);
        userName.innerHTML = name;
        },
        insertDate: function(date){
        var userDate = document.querySelector('.js-main-date');
        console.log("это userDate",userDate);
        userDate.innerHTML = date;
        },
        insertTime: function(data){

        var userDayPart = document.querySelector('.js-dayPart');
        userDayPart.innerHTML = data.dayPart;
        var userTime = document.querySelector('.js-time');
        userTime.innerHTML = data.time;
        userTime.appendChild(userDayPart);
       
        }   
    }

    var modelUserInfo = {
    name:null,
    getTime: function(){
        var data = {time:"", dayPart:""};

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

        data.time += "" + hh + ":" + mm;
        data.dayPart = "" + dayPart;
        return data;
    },
    getDate: function(){
        var d = new Date();
        var result = "";
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

        // Wed, September 3
        result = "" + day + ", " + month + " " + date;
        console.log(result);
        return result;

    }
};



var controllerUserInfo = {
    logIn: function(){

        // startTime = new Date();
        var login = this.elements.login.value;
        var password = this.elements.password.value;

        console.log(login, password);

        var loginRequest = new XMLHttpRequest();
        loginRequest.open('GET', '/login?' + "login=" + login + "&" + "password=" + password, true);
        loginRequest.send();
        console.log(loginRequest);
        console.log(getCookie('login'));

        function fillAll(){
            modelUserInfo.name = getCookie('login');
            modelUserInfo.getDate();
            viewUserInfo.insertDate(modelUserInfo.getDate());
            viewUserInfo.insertName(modelUserInfo.name);
            viewUserInfo.insertTime(modelUserInfo.getTime());
        }


        if(getCookie('login')){

        modelUserInfo.name = getCookie('login');
        // // expire30 = setInterval(checkDuration, 500);
        fillAll();
        dom.loginPage.classList.add("hide");
        dom.mainPage.classList.remove("hide");
         }

        return false;
    },
    logOut: function(){
        var logoutRequest = new XMLHttpRequest();
        logoutRequest.open('GET', '/logout', true);
        logoutRequest.send();
        console.log(logoutRequest);

        // deleteCookie("login");
        dom.mainPage.parentNode.classList.add("hide");
        dom.mainPage.classList.remove("hide");
        window.location.reload();
        return false;

    }
};

    var dom =  {};
        dom.loginForm = document.querySelector('.js-login-form');
        console.log(dom.loginForm);
        dom.loginPage = document.querySelector('.js-login-page');
        dom.logoutForm = document.querySelector('.js-logout-form');
        dom.logoutFormMobile = document.querySelector('.js-logout-form_mobile');
        dom.mainPage = document.querySelector('.js-main-page');

    dom.loginForm.onsubmit = controllerUserInfo.logIn;
    dom.logoutForm.onsubmit = controllerUserInfo.logOut;
    dom.logoutFormMobile.onsubmit = controllerUserInfo.logOut;

}

ready(main);
