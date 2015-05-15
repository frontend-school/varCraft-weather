function weatherHeaderDatesController(){
    for(var i = 0; i < 3; i++){
        WeatherHeaderDatesModel[i] = new WeatherHeaderDatesConstructor(new Date().getTime() + (i - 1) * 86400000);
        console.log(WeatherHeaderDatesModel[i].getDate());
    }
    weatherHeaderDatesView();
    setTimeout(weatherHeaderDatesController, 1000);
}