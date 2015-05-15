function WeatherHeaderDatesConstructor(unixTime){
    var date = new Date(unixTime),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

    this.getDate = function(){
        return {
            day: day,
            month: month,
            year: year
        }
    };
}

var WeatherHeaderDatesModel = [
    new WeatherHeaderDatesConstructor(),
    new WeatherHeaderDatesConstructor(),
    new WeatherHeaderDatesConstructor()
];

console.log(new WeatherHeaderDatesConstructor());