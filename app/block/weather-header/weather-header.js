function weatherHeader(){
    if(!username) return;

    var currentDate = new Date();
    var dateModifiers = [-1, 0, 1];
    var names = {
        '-1':'Yesterday',
        '0':'Today',
        '1':'Tomorrow'
    };
    var dates = dateModifiers.map(function(mod){
        return new Date(currentDate.getTime() + mod * 86400000);
    });

    var dateNames = document.getElementsByClassName('weather-header__caption_name');
    var dateDates = document.getElementsByClassName('weather-header__caption_date');

    try {
        for (var i = 0; i < dateNames.length; i++) {
            dateNames[i].innerHTML = names[i - 1];
            dateDates[i].innerHTML = dates[i].getDate() + ' / ' + dates[i].getMonth() + ' / ' + dates[i].getFullYear();
        }
    }
    catch(error) {
        alert('An error occurred in module "weather-header"');
    }
}