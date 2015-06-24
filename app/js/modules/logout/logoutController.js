window.varCraft = window.varCraft || {};
window.varCraft.logoutController =  window.varCraft.logoutController || {};

varCraft.logoutController = (function(namespace){
        function start(){
            namespace.logoutView._init();
        }
        return {
            _start: start,
            setLogStatus: function(status){
                namespace.logoutModel.setLogStatus(status);
            }
        };
})(window.varCraft);

