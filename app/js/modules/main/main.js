function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    window.onload = fn;
  }
}



function main(){

    location.hash = window.varCraft.CONST.hashStates.login;
    window.onhashchange = function(){
        if(location.hash !== curHash){
            location.hash = curHash;
        }
    };

    var curHash;

    varCraft.mediator.installTo(varCraft.loginController);
    varCraft.mediator.installTo(varCraft.logoutController);
    varCraft.mediator.installTo(varCraft.weatherController);
    varCraft.mediator.installTo(varCraft.locationController);

    varCraft.locationController._start();
    varCraft.mobileController._start();

    varCraft.mediator.subscribe("login", function(){location.hash = window.varCraft.CONST.hashStates.weather; curHash = location.hash;});
    varCraft.mediator.subscribe("login", varCraft.DateTimeController._start);
    varCraft.locationController.subscribe("login", varCraft.locationController.getLocation);
    varCraft.mediator.subscribe("logout", function(){location.hash = window.varCraft.CONST.hashStates.login; curHash = location.hash;});

    varCraft.logoutController._start();
    varCraft.weatherController._start();
    varCraft.weatherController.subscribe("login", varCraft.weatherController.changeForecast);
    varCraft.loginController._start();
}

ready(main);
