window.varCraft = window.varCraft || {};
window.varCraft.loginView =  window.varCraft.loginView || {};

varCraft.loginView = (function(namespace){
    function init(){
        var mainPage = namespace.dom.getElem(namespace.CONST.mainPage),
            loginPage = namespace.dom.getElem(namespace.CONST.loginPage),
            loginForm = namespace.dom.getElem(namespace.CONST.loginForm),
            userNameField = namespace.dom.getElem(namespace.CONST.userNameField);

        function loginSuccess(){
            var userName = namespace.cookie.getCookie("login");
            namespace.loginController.setUserName(userName);
            namespace.loginController.publish("login");
            namespace.dom.changeContent(userNameField, userName);
        }

        function switchView(){
            namespace.dom.removeClass(mainPage, "hide");
            namespace.dom.addClass(loginPage, "hide");
        }

        if(namespace.cookie.getCookie("login")){
            loginSuccess();
            switchView();
        }

        function LoginCallback(e){
            var login = this.elements.login.value,
                password = this.elements.password.value;
                this.elements.login.value = "";
                this.elements.password.value = "";
                namespace.Event.preventDefault(e);

                namespace.xhr.getAsync('http://localhost:3000/login?' + "login=" + login + "&" + "password=" + password, function(){
                console.log(this.responseText);
                response = JSON.parse(this.responseText);

                if(response.status === "success"){
                     loginSuccess();
                     console.log(mainPage);
                     console.log(loginPage);
                     switchView();
                }
                else window.location.reload();
            });
        }

        namespace.Event.addEvent(loginForm, "submit", LoginCallback );
    }

    return {
        _init: init
    };
})(window.varCraft);