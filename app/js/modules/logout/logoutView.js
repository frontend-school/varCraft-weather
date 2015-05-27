window.varCraft = window.varCraft || {};
window.varCraft.logoutView =  window.varCraft.logoutView || {};

window.varCraft.logoutView = (function(namespace){

        function init(){
            var mainPage = namespace.dom.getElem(namespace.CONST.mainPage),
                loginPage = namespace.dom.getElem(namespace.CONST.loginPage),
                logoutForm = namespace.dom.getElem(namespace.CONST.logoutForm),
                logoutFormMobile = namespace.dom.getElem(namespace.CONST.logoutFormMobile);
                namespace.Event.addEvent(logoutForm, "submit", logoutCallback);
                namespace.Event.addEvent(logoutFormMobile, "submit", logoutCallback);

            function logoutCallback(e){
                namespace.xhr.getAsync('http://localhost:3000/logout', function(){
                    var check = JSON.parse(this.responseText);
                    console.log(check);
                    namespace.logoutController.setLogStatus(false);
                    switchView();
                });
                namespace.Event.preventDefault(e);
            }

            function switchView(){
                namespace.dom.addClass(mainPage, "hide");
                namespace.dom.removeClass(loginPage, "hide");
            }
        }
        return {
            _init: init
        };
    })(window.varCraft);