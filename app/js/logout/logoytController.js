window.varCraft = window.varCraft || {};
window.varCraft.logoutController =  window.varCraft.logoutController || {};
varCraft.logout = varCraft.logout || {};
varCraft.logout.pubsub = varCraft.logout.pubsub || new CreatePubSub();

varCraft.logoutController = (function(){
        varCraft.logout.pubsub.subscribe("logoutSuccess", varCraft.logoutModel.setLogStatus);
        return {};
})();

//main part starting here

