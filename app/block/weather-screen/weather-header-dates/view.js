function weatherHeaderDatesView() {
    var weatherHeaderDates = document.getElementsByClassName('weather__header_date');
    var dt = subscribe('datetime');
    weatherHeaderDates[0].innerHTML = stringifyDate(new Date(dt - 86400000));
    weatherHeaderDates[1].innerHTML = stringifyDate(new Date(dt));
    weatherHeaderDates[2].innerHTML = stringifyDate(new Date(dt + 86400000));
    //for(var i = 0; i < 3; i++){
    //    weatherHeaderDates[i].innerHTML = stringifyDate(WeatherHeaderDatesModel[i]);
    //}
    function stringifyDate(date){
        //var date = dateObj.getDate();
        return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear();
    }
}