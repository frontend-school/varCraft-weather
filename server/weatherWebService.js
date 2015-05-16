module.exports = function(app) {
    var weather = {
        dayTemp: 22,
        nightTemp: -17,
        state: 'fog',
        humidity: 67,
        wind: '4 NW',
        moon: 3
    };
    var result = [weather, weather, weather];
    app.all('/forecast', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.status(200).send(result);
    });
};
