window.varCraft = window.varCraft || {};
window.varCraft = window.varCraft || {};
window.varCraft.loginController =  window.varCraft.loginController || {};

window.varCraft.loginController = (function(namespace){
    function start(){
        namespace.loginView._init();
    }

    return {
        _start: start,
        setUserName: function(userName){
            if(userName){
                namespace.loginModel.setUserName(userName);
                namespace.loginModel.setLogStatus(true);
            }
        },
        deleteUserName: function(){
            console.log("[loginController fire!]");
            namespace.loginModel.setUserName("userName");
            namespace.loginModel.setLogStatus(false);
        }
    };

})(window.varCraft);