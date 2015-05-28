function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    window.onload = fn;
  }
}



function main(){

    console.log(varCraft);
    varCraft.mediator.installTo(varCraft.loginController);
    varCraft.mediator.installTo(varCraft.logoutController);
    varCraft.mediator.installTo(varCraft.weatherController);
    varCraft.mediator.installTo(varCraft.locationController);

    varCraft.locationController._start();
    varCraft.mobileController._start();

    varCraft.mediator.subscribe("login", varCraft.DateTimeController._start);
    varCraft.locationController.subscribe("login", varCraft.locationController.getLocation);

    varCraft.logoutController._start();
    varCraft.weatherController._start();
    varCraft.weatherController.subscribe("login", varCraft.weatherController.changeForecast);
    varCraft.loginController._start();
}

ready(main);
