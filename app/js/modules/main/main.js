function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    window.onload = fn;
  }
}


function main(){
    var pages = {
        loginPage: varCraft.dom.getElem(varCraft.CONST.loginPage),
        mainPage: varCraft.dom.getElem(varCraft.CONST.mainPage)
    };

    varCraft.router._add(varCraft.CONST.hash.loginPage, pages.loginPage, function(){
        if(! varCraft.loginModel.getLogStatus()){
            return true;
        }
        else return false;
    });

    varCraft.router._add(varCraft.CONST.hash.mainPage, pages.mainPage, function(){
        if(varCraft.loginModel.getLogStatus()){
            return true;
        }
        else return false;
    });

    console.log(varCraft.router.routes);
    varCraft.router._listen();


    varCraft.mediator.installTo(varCraft.loginController);
    varCraft.mediator.installTo(varCraft.logoutController);
    varCraft.mediator.installTo(varCraft.weatherController);
    varCraft.mediator.installTo(varCraft.locationController);

    varCraft.locationController._start();
    varCraft.mobileController._start();
    varCraft.logoutController._start();
    varCraft.weatherController._start();

    varCraft.mediator.subscribe("login", varCraft.DateTimeController._start);
    varCraft.mediator.subscribe("login", function(){
        varCraft.router._switchRoute(varCraft.CONST.hash.mainPage);
    });
    varCraft.locationController.subscribe("login", varCraft.locationController.getLocation);
    varCraft.weatherController.subscribe("gotLocation", varCraft.weatherController.setLocation);
    varCraft.weatherController.subscribe("gotLocation", varCraft.weatherController.changeForecast);

    varCraft.loginController.subscribe("logout", varCraft.loginController.deleteUserName);
    varCraft.mediator.subscribe("logout", function(){
        varCraft.router._switchRoute(varCraft.CONST.hash.loginPage);
    });
    varCraft.weatherController.subscribe("logout", varCraft.weatherController.setDefault); //removes all data from DOM    

    varCraft.loginController._start(); //this one os here because for page refresh proper work, believe me
}

ready(main);
