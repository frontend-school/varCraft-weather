function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    window.onload = fn;
  }
}


function main(){
    window.varCraft.domElems =  {};
           varCraft.domElems.loginForm = document.querySelector('.js-login-form');
           varCraft.domElems.loginPage = document.querySelector('.js-login-page');
           varCraft.domElems.logoutForm = document.querySelector('.js-logout-form');
           varCraft.domElems.logoutFormMobile = document.querySelector('.js-logout-form_mobile');
           varCraft.domElems.mainPage = document.querySelector('.js-main-page');
           varCraft.domElems.userName = document.querySelector('.js-user-name');

    varCraft.mediator.installTo(varCraft.loginController);
    varCraft.mediator.installTo(varCraft.logoutController);
    varCraft.mediator.subscribe("login", varCraft.DateTimeController._start);
    varCraft.loginController._start();
    varCraft.logoutController._start();
}

ready(main);
