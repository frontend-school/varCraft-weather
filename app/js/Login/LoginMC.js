//!!!Login Model


window.varCraft.loginModel =  window.varCraft.loginModel || {};
varCraft.login = varCraft.login || {};
varCraft.login.pubsub = varCraft.login.pubsub || new CreatePubSub();

varCraft.loginModel = (function(){
    var logStatus,
        userName;
    return {
        setLogStatus: function(newStatus){
            if(newStatus){
                logStatus = newStatus;
            }
        },
        getLogStatus: function(){
            return logStatus;
        },
        setUserName: function(curUserName){
            if(curUserName){
                userName = curUserName;
            }
        },
        getUserName: function(){
            return userName;
        }
    };
})();


//!!!Login Controller
window.varCraft = window.varCraft || {};
window.varCraft = window.varCraft || {};
window.varCraft.loginController =  window.varCraft.loginController || {};

varCraft.loginController = (function(){
    varCraft.login.pubsub.subscribe("loginSuccess", varCraft.loginModel.setLogStatus);
    varCraft.login.pubsub.subscribe("loginSuccess", varCraft.loginModel.setUserName);

    return {
    };

})();

