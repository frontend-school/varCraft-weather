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
    //varCraft.weatherController.changeForecast();
    varCraft.loginController._start();

    //addScript('http://geocode-maps.yandex.ru/1.x/?format=json&results=1&callback=geo&lang=en_US&geocode=30.3571081,50.4631532');

}

ready(main);
