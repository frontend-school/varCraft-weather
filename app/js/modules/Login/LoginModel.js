window.varCraft.loginModel =  window.varCraft.loginModel || {};
varCraft.login = varCraft.login || {};

window.varCraft.loginModel = (function(){
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
})(window.varCraft);



