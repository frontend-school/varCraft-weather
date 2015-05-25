function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    window.onload = fn;
  }
}

// function geo(obj){
//   console.log(obj.response.GeoObjectCollection.featureMember[0].GeoObject.description);
//   console.dir(obj);
// }

// function addScript(src) {
//   var elem = document.createElement("script");
//   elem.src = src;
//   document.head.appendChild(elem);
// }



function main(){
    window.varCraft.domElems =  {};
           varCraft.domElems.loginForm = document.querySelector('.js-login-form');
           varCraft.domElems.loginPage = document.querySelector('.js-login-page');
           varCraft.domElems.logoutForm = document.querySelector('.js-logout-form');
           varCraft.domElems.logoutFormMobile = document.querySelector('.js-logout-form_mobile');
           varCraft.domElems.mainPage = document.querySelector('.js-main-page');
           varCraft.domElems.userName = document.querySelector('.js-user-name');

    console.log(varCraft);
    varCraft.mediator.installTo(varCraft.loginController);
    varCraft.mediator.installTo(varCraft.logoutController);
    varCraft.mediator.installTo(varCraft.weatherController);
    varCraft.mediator.installTo(varCraft.locationController);

    varCraft.locationController._start();

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
