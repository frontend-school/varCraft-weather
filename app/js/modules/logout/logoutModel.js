window.varCraft = window.varCraft || {};
window.varCraft.logoutModel =  window.varCraft.logoutModel || {};

varCraft.logoutModel = (function(namespace){
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
})(window.varCraft);