window.varCraft = window.varCraft || {};
window.varCraft.logoutView =  window.varCraft.logoutView || {};
varCraft.logout = varCraft.logout || {};
varCraft.logout.pubsub = varCraft.logout.pubsub || new CreatePubSub();

varCraft.logoutView = (function(){

        function init(){
            varCraft.domElems.logoutForm.onsubmit = logout;
            varCraft.domElems.logoutFormMobile.onsubmit = logout;

            function logout(){

                var logoutRequest = new XMLHttpRequest();
                logoutRequest.withCredentials = true;
                logoutRequest.open('GET', 'http://localhost:3000/logout', true);

                logoutRequest.onload = function() {
                   var check = JSON.parse(this.responseText);
                   varCraft.logout.pubsub.publish("logoutSuccess", false);
                   changeMainView();
                   window.location.reload();

                };

                logoutRequest.send();
                return false;
            }

            function changeMainView(){
                varCraft.domElems.mainPage.classList.add("hide");
                varCraft.domElems.loginPage.classList.remove("hide");
            }
        }
        return {
            _init: init
        };
    })();