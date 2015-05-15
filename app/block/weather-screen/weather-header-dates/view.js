function weatherHeaderDatesView() {
    var weatherHeaderDates = document.getElementsByClassName('weather__header_date');
    for(var i = 0; i < 3; i++){
        weatherHeaderDates[i].innerHTML = stringifyDate(WeatherHeaderDatesModel[i]);
    }
    function stringifyDate(dateObj){
        var date = dateObj.getDate();
        return date.day + ' / ' + (date.month + 1) + ' / ' + date.year;
    }
}