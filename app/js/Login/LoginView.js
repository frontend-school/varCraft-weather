window.varCraft = window.varCraft || {};
window.varCraft.loginView =  window.varCraft.loginView || {};
varCraft.login = varCraft.login || {};
varCraft.login.pubsub = varCraft.login.pubsub || new CreatePubSub();

varCraft.loginView = (function(){
    function init(){
        if(varCraft.services.cookie.getCookie("login")){
            var userName = varCraft.services.cookie.getCookie("login");
            varCraft.login.pubsub.publish("loginSuccess", userName);
            varCraft.loginController.publish("login");
            varCraft.domElems.userName.innerHTML = userName;
            changeMainView();
        }

        var mainPage = varCraft.domElems.mainPage,
            loginPage = varCraft.domElems.loginPage;

            varCraft.domElems.loginForm.onsubmit = function (){

            var login = this.elements.login.value,
                password = this.elements.password.value;
                this.elements.login.value = "";
                this.elements.password.value = "";

            var loginRequest = new XMLHttpRequest();
            loginRequest.withCredentials = true;
            loginRequest.open('GET', 'http://localhost:3000/login?' + "login=" + login + "&" + "password=" + password, true);


            loginRequest.onload = function() {
               console.log(this.responseText);
               response = JSON.parse(this.responseText);

               if(response.status === "success"){
                    var userName = varCraft.services.cookie.getCookie("login");
                    varCraft.login.pubsub.publish("loginSuccess", userName);
                    varCraft.loginController.publish("login");
                    varCraft.domElems.userName.innerHTML = userName;
                    changeMainView();
               }
               else window.location.reload();
            };
            loginRequest.send();
            return false;
        };
    }

    function changeMainView(){
        varCraft.domElems.loginPage.classList.add("hide");
        varCraft.domElems.mainPage.classList.remove("hide");
    }


    return {
        _init: init
    };
})();