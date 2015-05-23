window.varCraft = window.varCraft || {};
window.varCraft.logoutView =  window.varCraft.logoutView || {};

window.varCraft.logoutView = (function(namespace){

        function init(){
            var mainPage = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.mainPage),
                loginPage = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.loginPage),
                logoutForm = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.logoutForm),
                logoutFormMobile = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.logoutFormMobile);
                namespace.services.Event.addEvent(logoutForm, "submit", logoutCallback);
                namespace.services.Event.addEvent(logoutFormMobile, "submit", logoutCallback);

            function logoutCallback(e){
                namespace.services.xhr.getAsync('http://localhost:3000/logout', function(){
                    var check = JSON.parse(this.responseText);
                    namespace.logoutController.setLogStatus(false);
                    switchView();
                });
                namespace.services.Event.preventDefault(e);
            }

            function switchView(){
                namespace.services.dom.addClass(mainPage, "hide");
                namespace.services.dom.removeClass(loginPage, "hide");
            }
        }
        return {
            _init: init
        };
    })(window.varCraft);