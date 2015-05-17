//Data User MVC
var varCraft = window.varCraft || {};

varCraft.constants = {};

varCraft.DateTimeModel = (function(){
    var time, dayPart, date;
    return {
        setDate: function (newDate){
            if(newDate){
                date = newDate
            };
        },
        getDate: function (){
            return date;
        },

        setTime: function (newTime){
            if(newTime){
                time = newTime;
            };
        },

        getTime: function(){
            return time;
        },

        setDayPart: function (newDayPart){
            if(dayPart){
                dayPart = newDayPart;
            };
        },

        getDayPart: function(){
            return dayPart;
        }


    }
})();

varCraft.DateTimeView = (function(){
    function init(){
        var dateField = document.querySelector('.js-main-date'),
            timeField = document.querySelector('.js-main-time'),
            dayPartField = document.querySelector('.js-dayPart');


        this.refreshDate = function(date){
            if(date){
                dateField.textContent = date;
                return true;
            };
            return false;
        };

        this.refreshTime = function (time, dayPart){
            if(time){
                timeField.textContent = time;
            };

            if(dayPart){
                dayPartField.textContent = dayPart;
            };
        };
    }

    return {
        _init: init,
        _enable: false
    }

})();

varCraft.DateTimeController = (function (){
    var inAction;

    function start(){
        var curDateTime ;

        inAction = setInterval(function(){
            curDateTime = new Date(),
            dateFormated = formatDate(curDateTime),
            timeFormated = formatTime(curDateTime);

            varCraft.setTime(timeFormated.time);
            varCraft.setDayPart(timeFormated.dayPart);
            varCraft.setDate(dateFormated); //maybe better to fire event which will lead model to update attributes???

        }, 60000);

    }

    function stop(){
        clearInterval(inAction);
    }

    function formatDate(curDateTime){
        var dateFormated = "",
            date = curDateTime.getDate(),
            year = curDateTime.getFullYear(),
            monthes = ["January", "February", "March",
                       "April", "May", "June", "July",
                       "August", "September", "October",
                       "November", "December"],
            days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            month = monthes[curDateTime.getMonth()],
            day = days[curDateTime.getDay()];

        // Wed, September 3
        dateFormated = "" + day + ", " + month + " " + date;
        return dateFormated;
    }

    function formatTime(curDateTime){
        var timeFormated = "";
        var data = {time:"", dayPart:""};

        var curDateTime = new Date();

        var hh = curDateTime.getHours();

        var dayPart;
          if(hh <= 12) {
            dayPart = "am";}
            else{
              dayPart = "pm";
            }
           if(hh > 12)hh -= 12;

        var mm = curDateTime.getMinutes();
          if(mm < 10){
            mm = "0" + mm;
          }

        data.time += "" + hh + ":" + mm;
        data.dayPart = "" + dayPart;
        return data;
    };

    return {
        start: function(){
             if(!varCraft.DateTimeView._enable){
                varCraft.DateTimeView._init();
             }

             start();
        }
    }

})()


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
        var d = new Date(), result = "",
            date = d.getDate(),
            year = d.getFullYear(),
            monthes = ["January", "February", "March",
                       "April", "May", "June", "July", 
                       "August", "September", "October",
                       "November", "December"],
            days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            month = monthes[d.getMonth()],
            day = days[d.getDay()];

        // Wed, September 3
        result = "" + day + ", " + month + " " + date;
        console.log(result);
        return result;

    }
};


var controllerUserInfo = {
    logIn: function(){
        var check=3;
        // startTime = new Date();
        var login = this.elements.login.value;
        var password = this.elements.password.value;

        var loginRequest = new XMLHttpRequest();
        loginRequest.withCredentials = true;
        loginRequest.open('GET', 'http://localhost:3000/login?' + "login=" + login + "&" + "password=" + password, true);


        loginRequest.onload = function() {
           console.log(this.responseText);
           check = JSON.parse(this.responseText);
           console.dir(check);
           login = 27;

           if(check.status === "success"){

           modelUserInfo.name = getCookie('login');
           // // expire30 = setInterval(checkDuration, 500);
           fillAll();
           dom.loginPage.classList.add("hide");
           dom.mainPage.classList.remove("hide");

            }
            else window.location.reload();
        };


        loginRequest.send();

        function fillAll(){
            modelUserInfo.name = getCookie('login');
            modelUserInfo.getDate();
            viewUserInfo.insertDate(modelUserInfo.getDate());
            viewUserInfo.insertName(modelUserInfo.name);
            viewUserInfo.insertTime(modelUserInfo.getTime());
        }

        

        return false;
    },
    logOut: function(){
        var logoutRequest = new XMLHttpRequest(),
            checkout;
        logoutRequest.withCredentials = true;
        logoutRequest.open('GET', 'http://localhost:3000/logout', true);

        logoutRequest.onload = function() {
           checkout = JSON.parse(this.responseText);
           console.log(checkout);
        };


        logoutRequest.send();
        if(checkout.status === "success"){
        // deleteCookie("login");
        dom.mainPage.parentNode.classList.add("hide");
        dom.mainPage.classList.remove("hide");
       // window.location.reload();
        }
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
