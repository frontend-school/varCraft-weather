//model
var weathers = [];
CreateWeather();
function WeatherModel(dayT, nightT, st, hum, wndSpeed, wndDirection, mn){
    this.dayTemp = dayT;
    this.nightTemp = nightT;
    this.state = st;
    this.humidity = hum;
    this.windSpeed = wndSpeed;
    this.windDirection = wndDirection;
    this.moon = mn;
}

//controller
function CreateWeather(){
    for(var i = 0; i < 3; i++) {
        weathers.push(new WeatherModel(
            randomizeTemperature(),
            randomizeTemperature(),
            randomizeState(),
            randomizeHumidity(),
            randomizeWind().speed,
            randomizeWind().direction,
            randomizeMoon()
        ));
    }

    function randomizeTemperature(){
        return ((Math.random() - 0.5) * 100 % 30).toFixed(0);
    }
    function randomizeHumidity(){
        return (Math.random() * 100).toFixed(0);
    }
    function randomizeWind(){
        return {
            speed: (Math.random() * 100).toFixed(0),
            direction: (Math.random() * 100 % 7).toFixed(0)
        };
    }
    function randomizeMoon(){
        return (Math.random() * 100 % 8).toFixed(0);
    }
    function randomizeState(){
        return (Math.random() * 10).toFixed(0);
    }
}

//view
module.exports = function(app) {
    app.all('/forecast', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.status(200).send(weathers);
    });
};
