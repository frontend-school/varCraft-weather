window.varCraft.mobileController =  window.varCraft.mobileController || {};

window.varCraft.mobileController = (function(namespace){
    function start(){
        namespace.mobileView._init();
    }

    return {
        _start: start
    }
})(window.varCraft);


