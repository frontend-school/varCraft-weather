//controller
function weatherScreenController() {
    mainDateTimeController();
    weatherHeaderDatesController();

    var request = 'http://' + window.location.host + '/forecast';
    var model = [];
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            model = JSON.parse(xmlhttp.responseText);
            weatherScreenView(model);
        }
    };
    xmlhttp.open("GET", request, true);
    xmlhttp.send();
}

//view
function weatherScreenView(model){
    var eStatesClasses = ['sunny', 'downpour', 'sleet', 'snow-fall', 'snow', 'rain', 'light-rain', 'mostly-cloudy', 'partly-cloudy', 'rain-and-sun', 'fog', 'something-strange', 'thunderstorm'];
    var eStatesNames = ['Sunny', 'Downpour', 'Sleet', 'Snow Fall', 'Snow', 'Rain', 'Light Rain', 'Mostly Cloudy', 'Partly Cloudy', 'Rain and Sun', 'Fog', 'Something Strange', 'Thunderstorm'];
    var eMoons = ['moon-new', 'moon-waxing-cresent', 'moon-first-quarter', 'moon-waxing-gibbous', 'moon-full', 'moon-waning-gibbous', 'moon-last-quarter', 'moon-waning-cresent'];
    var eWindsClasses = ['wind-n', 'wind-ne', 'wind-e', 'wind-se', 'wind-s', 'wind-sw', 'wind-w', 'wind-nw'];
    var eWindsNames = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];


    var states = document.getElementsByClassName('weather__info');//2 classes + icon
    var stateIcons = document.getElementsByClassName('weather__info_state_icon');
    var stateNames = document.getElementsByClassName('weather__info_caption');
    var dayTemps = document.getElementsByClassName('weather__info_temperature_day');
    var nightTemps = document.getElementsByClassName('weather__info_temperature_night');
    var humidities = document.getElementsByClassName('weather__info_misc_humidity');
    var winds = document.getElementsByClassName('weather__info_misc_wind');//2 classes
    var moons = document.getElementsByClassName('weather__info_misc_moon');//2 classes
    console.log(model);
    for(var i = 0; i < 3; i++){
        states[i].className = 'weather__info ' + eStatesClasses[model[i].state];
        stateIcons[i].className = 'weather__info_state_icon ' + eStatesClasses[model[i].state] + '-icon';
        stateNames[i].innerHTML = eStatesNames[model[i].state];
        dayTemps[i].innerHTML = model[i].dayTemp;
        nightTemps[i].innerHTML = model[i].nightTemp;
        humidities[i].children[0].innerHTML = model[i].humidity;
        winds[i].children[0].innerHTML = model[i].windSpeed + 'mph';
        winds[i].children[1].className = 'weather__info_misc_icon ' + eWindsClasses[model[i].windDirection];
        winds[i].children[1].children[0].innerHTML = eWindsNames[model[i].windDirection];
        moons[i].children[1].className = 'weather__info_misc_icon ' + eMoons[model[i].windDirection];
    }
}