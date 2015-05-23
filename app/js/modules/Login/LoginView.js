window.varCraft = window.varCraft || {};
window.varCraft.loginView =  window.varCraft.loginView || {};
varCraft.login = varCraft.login || {};

varCraft.loginView = (function(namespace){
    function init(){
        var mainPage = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.mainPage),
            loginPage = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.loginPage),
            loginForm = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.loginForm),
            userNameField = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.userNameField);

        function loginSuccess(){
            var userName = namespace.services.cookie.getCookie("login");
            namespace.loginController.setUserName(userName);
            namespace.loginController.publish("login");
            namespace.services.dom.changeContent(userNameField, userName);
        }

        function switchView(){
            namespace.services.dom.removeClass(mainPage, "hide");
            namespace.services.dom.addClass(loginPage, "hide");
        }

        if(namespace.services.cookie.getCookie("login")){
            loginSuccess();
            switchView();
        }

        function LoginCallback(e){
            var login = this.elements.login.value,
                password = this.elements.password.value;
                this.elements.login.value = "";
                this.elements.password.value = "";
            namespace.services.Event.preventDefault(e);

            namespace.services.xhr.getAsync('http://localhost:3000/login?' + "login=" + login + "&" + "password=" + password, function(){
                console.log(this.responseText);
                response = JSON.parse(this.responseText);

                if(response.status === "success"){
                     loginSuccess();
                     console.log(mainPage);
                     console.log(loginPage);
                     switchView();
                }
                else window.location.reload();
            })
        }

        namespace.services.Event.addEvent(loginForm, "submit", LoginCallback );
    }

    return {
        _init: init
    };
})(window.varCraft);