var fs = require('fs'),
    file = 'server/data/weather.json',
    weatherObj = {};

exports.getWeather = function() {
    weatherObj = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return weatherObj;
};

