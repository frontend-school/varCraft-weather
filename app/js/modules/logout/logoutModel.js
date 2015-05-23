window.varCraft = window.varCraft || {};
window.varCraft.logoutModel =  window.varCraft.logoutModel || {};
varCraft.logout = varCraft.logout || {};
varCraft.logout.pubsub = varCraft.logout.pubsub || new CreatePubSub();

varCraft.logoutModel = (function(){
    var logStatus;
    return {
        setLogStatus: function(newStatus){
            if(newStatus){
                logStatus = newStatus;
            }
        },
        getLogStatus: function(){
            return logStatus;
        }
    };
})();