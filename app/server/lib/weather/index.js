// In this APP is used Aeris weather-API(former HAM weather)
var http = require('http');


function analyzeWeatherCode(cloudCode, complexWeatherCode){
    var weatherConditions = {
        "Sun" : "forecast_sun",
        "Mostly Cloudy": "forecast_mostly-cloudy",
        "Partly Cloudy": "forecast_partly-cloudy",

        "Hail": "forecast_hail",
        "Light Rain": "forecast_light-rain",
        "Rain": "forecast_rain",
        "Downpour": "forecast_downpour",//ливень
        "Rain and Sun": "forecast_rain-and-sun",
        "Thunderstorm": "forecast_thunderstorm",

        "Snow":"forecast_snow",
        "Snow Fall": "forecast_snow-fall",//снегопад
        "Sleet": "forecast_sleet", //дождь со снегом

        "Waterspouts": "forecast_waterspouts",

        "Fog": "forecast_fog"

    }

    var codes = {
        coverage: {
        "AR":"Areas of",
        "BR": "Brief",
        "C": "Chance of",
        "D": "Definite",
        "FQ":  "Frequent",
        "IN":  "Intermittent",
        "IS":  "Isolated",
        "L":   "Likely",
        "NM":  "Numerous",
        "O":   "Occasional",
        "PA":  "Patchy",
        "PD":  "Periods of",
        "S":   "Slight chance",
        "SC":  "Scattered",
        "VC":  "Nearby",
        "WD":  "Widespread"
        },
        cloud: {
        "CL":  "Clear",
        "FW":  "Fair/Mostly sunny",
        "SC":  "Partly cloudy",
        "BK":  "Mostly Cloudy",
        "OV":  "Cloudy/Overcast"
        },
        intensity: {
        "VL":  "Very light",
        "L":   "Light",
        "H":   "Heavy",
        "VH":  "Very heavy"
        },
        weather: {
            "rain":{
                "A":   "Hail",
                "BY":  "Blowing spray",
                "L":   "Drizzle",
                "R":   "Rain",
                "RW":  "Rain showers",
                "T":   "Thunderstorms",
                "WP":  "Waterspouts",
                "ZL":  "Freezing drizzle",
                "ZR":  "Freezing rain",
                "ZY":  "Freezing spray"
            },
            "snow": {
                "BS":  "Blowing snow",
                "IP":  "Ice pellets / Sleet",
                "SI":  "Snow/sleet mix",
                "WM":  "Wintry mix (snow, sleet, rain)",
                "S":   "Snow",
                "SW":  "Snow showers"
            },

            "fog":{
                "BR":  "Mist",
                "F":   "Fog",
                "IF":  "Ice fog",
                "ZF":  "Freezing fog",
                "H":   "Haze"
            },
            "unknown":{
                "BD":  "Blowing dust",
                "BN":  "Blowing sand",
                "FR":  "Frost",
                "IC":  "Ice crystals",
                "K":   "Smoke",
                "UP":  "Unknown precipitation",
                "VA":  "Volcanic ash"
            }

        }

    }
    var weatherCodeParsed = complexWeatherCode.split(":");
    var coverageCode = weatherCodeParsed[0];
    var intensityCode = weatherCodeParsed[1];
    var weatherCode = weatherCodeParsed[2];

    if(weatherCode in codes.weather.rain){
        if(weatherCode === "T"){
            return "Thunderstorm";
        }
        if(weatherCode === "WP"){
            return "Waterspouts";
        }
        if(weatherCode === "A"){
            return "Hail";
        }
        if(weatherCode==="L"||weatherCode==="ZL"||weatherCode==="BY"||weatherCode==="ZY"||(weatherCode==="R"||weatherCode==="ZR")&&(intensityCode==="VL"||intensityCode==="L")){
             if(cloudCode==="CL"||cloudCode==="FW"){
                    return "Rain and Sun";
             }
             return "Light Rain";
        }
        if(weatherCode==="RW"|| (weatherCode==="R"||weatherCode==="ZR")&&(intensityCode==="H"||intensityCode==="VH")){
            return "Downpour";
        }
        return "Rain";
    }

    if(weatherCode in codes.weather.snow){
        if(weatherCode==="IP"||weatherCode==="SI"||weatherCode==="WM"){
            return "Sleet";
        }

        if(weatherCode==="SW"||(weatherCode==="S"&&intensityCode==="VH")){
            return "Snow Fall";
        }

        return "Snow";
    }

    if(weatherCode in codes.weather.fog){
        return "Fog";
    }

    if(weatherCode in codes.cloud){
        if(weatherCode==="FW"||weatherCode==="CL"){
            return "Sun";
        }

        if(weatherCode==="SC"){
            return "Partly Cloudy";
        }

        return "Mostly Cloudy";
    }

    if(weatherCode in codes.unknown){
        return codes.unknown[weatherCode];
    }

}

// single endpoint request example:
// createReqString({endpoint: ["/forecast"],
//                  location:"50.4631632,30.3571629", 
//                  options:["from=yesterday", "filter=daynight", "limit=2"]}, 
//                  weatherAPI, false)

// multiple enpoints request (bacth) example:
// createReqString({endpoint: ["/forecasts", "/observations"], 
//                  location:"50.4631632,30.3571629",
//                  options:["from=yesterday", "filter=daynight", "limit=2"]}, 
//                  weatherAPI, true);


function createReqString(reqData, weatherAPI, batch){
    //location, endpoint, options = arr
    //batch means "multiple" with multiple endpoints
    var reqText = "";
    if(!batch){
            reqText += reqData.endpoint[0] + "/";
            reqText += reqData.location + "?";
            for (var i = 0; i < reqData.options.length; i++) {
                reqText += reqData.options[i] + "&";
            }
            reqText += weatherAPI.secretCode;
            return reqText;
    }
    else {
            reqText += "/batch" + "/";
            reqText += reqData.location + "?";
            reqText += "requests=";
            for (var i = 0; i < reqData.endpoint.length; i++) {
                reqText += reqData.endpoint[i];

                if(i === reqData.endpoint.length - 1 ){
                  reqText += "&";
                }
                else {
                  reqText += ",";
                }

            }

            for (var i = 0; i < reqData.options.length; i++) {
                reqText += reqData.options[i] + "&";
            }
            reqText += weatherAPI.secretCode;
            return reqText;
    }
}

function moonPhase(year, month, day){
    //firsth algorithm
    function Conway(year, month, day)
    {
        var r = year % 100;
        r %= 19;
        if (r>9){ r -= 19;}
        r = ((r * 11) % 30) + parseInt(month) + parseInt(day);
        if (month<3){r += 2;}
        r -= ((year<2000) ? 4 : 8.3);
        r = Math.floor(r+0.5)%30;
        return (r < 0) ? r+30 : r;
    }

    // second algorithm
    function Trig2(year,month,day) {
        n = Math.floor(12.37 * (year -1900 + ((1.0 * month - 0.5)/12.0)));
        RAD = 3.14159265/180.0;
        t = n / 1236.85;
        t2 = t * t;
        as = 359.2242 + 29.105356 * n;
        am = 306.0253 + 385.816918 * n + 0.010730 * t2;
        xtra = 0.75933 + 1.53058868 * n + ((1.178e-4) - (1.55e-7) * t) * t2;
        xtra += (0.1734 - 3.93e-4 * t) * Math.sin(RAD * as) - 0.4068 * Math.sin(RAD * am);
        i = (xtra > 0.0 ? Math.floor(xtra) :  Math.ceil(xtra - 1.0));
        j1 = julday(year,month,day);
        jd = (2415020 + 28 * n) + i;
        return (j1-jd + 30)%30;
    }

    function julday(year, month, day) {
        if (year < 0) { year ++; }
        var jy = parseInt(year);
        var jm = parseInt(month) +1;
        if (month <= 2) {jy--;  jm += 12;   } 
        var jul = Math.floor(365.25 *jy) + Math.floor(30.6001 * jm) + parseInt(day) + 1720995;
        if (day+31*(month+12*year) >= (15+31*(10+12*1582))) {
            ja = Math.floor(0.01 * jy);
            jul = jul + 2 - ja + Math.floor(0.25 * ja);
        }
        return jul;
    }

    return Conway(year, month, day);
};

var location="50.4631632,30.3571629";
sendReqToAPI(location, createReqString, analyzeWeatherCode);

function sendReqToAPI(location, createReqString, analyzeWeatherCode){

    var weatherAPI = {
        api: "api.aerisapi.com",
        secretCode:"client_id=CJJJaR93zeaUcqYar9FIh&client_secret=Ij7u8zZ9hc9syrHYjDP1q9w0wR1DZriljQpUpPfs"
    }

    var endpoints = {
            forecasts: "/forecasts%3Ffilter=daynight%26limit=5",
            observations: "/observations%3Ffields=ob.dateTimeISO",
            sunmoon: "/sunmoon",
            observationsArchive: "/observations/archive%3Ffrom=yesterday",
            observationsSummary: "/observations/summary%3Ffrom=yesterday"
    }


    function setDaySample(){
        this.date = "";
        this.weatherCondition = "";
        this.weatherConditionCoverage = "";
        this.temperatureAtDay = "";
        this.temperatureAtNight = "";
        this.windSpeed = ""; //mph
        this.windDirection = ""; //N NE
        this.moonPhase = 0; //0-30
        this.humidity = 0; //0,1,2
        this.humidityTitle = "60%"; //60%
    }

    //objects we will return filled with actual data
    var yesterday = new setDaySample();
    var today = new setDaySample();
    var tomorrow = new setDaySample();

    var reqTodayTomorrow = createReqString({
                 endpoint: [endpoints.sunmoon,endpoints.forecasts,endpoints.observations,endpoints.observationsArchive],
                 location:location,
                 options:[]},
                 weatherAPI, true);
    console.log(reqTodayTomorrow);

    //AJAX request sending for today tommorrow data 
    var options = {
      host: weatherAPI.api,
      port: '80',
      path: reqTodayTomorrow,
    };

    var req = http.get(options, function(res) {
        var body = '';

        res.on('data', function(chunk) {
          body += chunk;
        });

        res.on('end', function() {
          var forecast = JSON.parse(body);
          var moonPhaseResp = forecast.response.responses[0].response[0];
          var observationsResp = forecast.response.responses[2].response;
          var observationsArchiveResp = forecast.response.responses[3].response;

          var accurateCurDay = observationsResp.ob.dateTimeISO.split("T")[0]; // get "2015-06-15" date
          console.log("[accurateCurDay]:",accurateCurDay);

          // function fillYesterday(yesterday, accurateCurDay, location) {
          //       // 6/14/2015
          //       accurateCurDay = accurateCurDay.replace(/-/g, "/");
          //      // console.log("[acc ur date]:",accurateCurDay);
          //       var reqYesterday = createReqString({endpoint: ["/observations/summary" + "%3Ffrom=" + accurateCurDay,
          //                                                      "/observations/archive" + "%3Ffrom=" + accurateCurDay],
          //                                                        location:location,
          //                                                        options:[]},
          //                                                        weatherAPI, true);
          //       //console.log(reqYesterday);
          // }

          //fillYesterday(yesterday, accurateCurDay, location);

          var forecastResp = forecast.response.responses[1].response[0];
          var startNumber = 0;
          var forecastZeroElemDate = forecastResp.periods[startNumber].dateTimeISO.split("T")[0]
          console.log("[forecastZeroElemDate]", forecastZeroElemDate);

          if(accurateCurDay !== forecastZeroElemDate){
            startNumber += 1; // first element in periods array showing us forecast for yesterday night
            var todayDayNumber = startNumber;
            var todayNightNumber = todayDayNumber + 1;
            var tomorrowDayNumber = todayNightNumber + 1;
            var tomorrowNightNumber = tomorrowDayNumber + 1;
          }
          else if(!forecastResp.periods[startNumber].maxTempC){// we need it for API responses after 20:00
            //cause periods[0] in this case : "cur night temp"
            var todayDayNumber = startNumber;
            var todayNightNumber = startNumber;
            var tomorrowDayNumber = todayNightNumber + 1;
            var tomorrowNightNumber = todayNightNumber + 2;
          }

          // console.log("[accuaret Cur Day]:", accurateCurDay);
          // console.log("[forecastZeroElemDate]: ", forecastZeroElemDate);
          //console.log(accurateCurDay === forecastZeroElemDate);
          // In /forecast&filter=daynight request, first elem in periods array it's forecast for current DAY
          // next - for current NIGHT and etc

          //Now we need to fill today object



          function fillDay(day, forecastResp, moonPhaseResp, dayNumber, nightNumber){
            //today date
            var date = forecastResp.periods[dayNumber].dateTimeISO.split("T")[0].split("-");
            day.date = date[2] + " / " + date[1] +" / "+ date[0];
            console.log("[date]:", day.date);

            // night temp
            day.temperatureAtNight = forecastResp.periods[nightNumber].minTempC;
            if(day.temperatureAtNight > 0){
              day.temperatureAtNight = "+" + day.temperatureAtNight;
            }
            else if(day.temperatureAtNight < 0){
                      day.temperatureAtNight = "-" + day.temperatureAtNight ;
                 }


            console.log("[night Temp]:",day.temperatureAtNight);

            //day day temp
            if(forecastResp.periods[dayNumber].maxTempC){
                day.temperatureAtDay = forecastResp.periods[dayNumber].maxTempC;
                if(day.temperatureAtDay > 0){
                  day.temperatureAtDay = "+" + day.temperatureAtDay;
                }
                else if(day.temperatureAtDay < 0){
                          day.temperatureAtDay = "-" + day.temperatureAtDay ;
                     }

            }
            else {
                day.temperatureAtDay = day.temperatureAtNight;
            }
            console.log("[dayTemp:]", day.temperatureAtDay);

            //day Weather condition
            var dayWeatherCode = forecastResp.periods[dayNumber].weatherPrimaryCoded;
            var dayCloudCode = forecastResp.periods[dayNumber].cloudsCoded;

            day.weatherCondition = analyzeWeatherCode(dayCloudCode, dayWeatherCode);
            console.log("[weather condition]:",day.weatherCondition);

            //day humidity
            day.humidity = forecastResp.periods[dayNumber].humidity;
            if(day.humidity <= 33.333){
                day.humidityTitle = 0;
            }

            if(day.humidity > 33.333 && day.humidity <= 66.666){
                day.humidityTitle = 1;
            }

            if(day.humidity > 66.666){
                day.humidityTitle = 2;
            }
            day.humidity += "%";

            console.log("[humidity]:",day.humidity, day.humidityTitle);

            //day wind direction
            var windDirDEG = forecastResp.periods[dayNumber].windDirDEG;

            console.log(windDirDEG);
            if(windDirDEG <= 22){
              day.windDirection = "N";
            }

            if(windDirDEG >= 23 && windDirDEG <= 67){
              day.windDirection = "NE";
            }

            if(windDirDEG >= 68 && windDirDEG <= 112){
              day.windDirection = "E";
            }

            if(windDirDEG >= 113 && windDirDEG <= 157){
              day.windDirection = "SE";
            }

            if(windDirDEG >= 158 && windDirDEG <= 202){
              day.windDirection = "S";
            }

            if(windDirDEG >= 203 && windDirDEG <= 247){
              day.windDirection = "SW";
            }

            if(windDirDEG >= 248 && windDirDEG <= 292){
              day.windDirection = "W";
            }

            if(windDirDEG >= 293 && windDirDEG <= 359){
              day.windDirection = "NW";
            }

            console.log("[wind dir]:", day.windDirection);

            //day wind Speed

            day.windSpeed = forecastResp.periods[dayNumber].windSpeedMPH + "mph";
            console.log("[wind speed]:", day.windSpeed)

            // MoonPhase
            if(nightNumber <= 2){ // Here we check are we filling tomorrow or not cause tomorrow nightNumber always > 2
                day.moonPhase = Math.round(moonPhaseResp.moon.phase.age);
            }
            else{
                var d = day.date.split(" / ");
                day.moonPhase = moonPhase(d[2], d[1], d[0]);

            }

            console.log("[moon phase]:", day.moonPhase);

          }

          fillDay(today, forecastResp, moonPhaseResp, todayDayNumber, todayNightNumber);
          //console.log("[todayDayNumber and Night Number]",todayDayNumber, todayNightNumber);
          fillDay(tomorrow, forecastResp, moonPhaseResp, tomorrowDayNumber, tomorrowNightNumber);

          //we need to get correct date. We start from today.date, because in some time periods API could 
          // return not valid date

          fillYesterday(today.date, yesterday, observationsArchiveResp, 30, 45);

          function fillYesterday(todayDate, day, observationsArchiveResp, dayPeriodNumber, nightPeriodNumber){
                //date 
                var buf = todayDate.split(" / ");
                var todayDD = buf[0];
                var todayMM = buf[1];
                var todayYY = buf[2];

                var yesterdayDate = new Date(+todayYY, todayMM - 1, todayDD - 1);
                var yesterdayDD, yesterdayMM, yesterdayYY;

                var yesterdayDD = yesterdayDate.getDate();
                if(yesterdayDD < 10) yesterdayDD = "0" + yesterdayDD;
                var yesterdayMM = yesterdayDate.getMonth() + 1;
                if(yesterdayMM < 10) yesterdayMM = "0" + yesterdayMM;
                var yesterdayYY = yesterdayDate.getFullYear();

                day.date = yesterdayDD + " / " + yesterdayMM + " / " + yesterdayYY;
                console.log("[yesterday.date]:",day.date);

                //dayTemp
                day.temperatureAtDay = observationsArchiveResp.periods[dayPeriodNumber].ob.tempC;
                if(day.temperatureAtDay > 0){
                  day.temperatureAtDay = "+" + day.temperatureAtDay;
                }
                else if(day.temperatureAtDay < 0){
                          day.temperatureAtDay = "-" + day.temperatureAtDay ;
                     }
                console.log("[yesterday dayTemp]:",day.temperatureAtDay);

                //night temp
                day.temperatureAtNight = observationsArchiveResp.periods[nightPeriodNumber].ob.tempC;
                if(day.temperatureAtNight > 0){
                  day.temperatureAtNight = "+" + day.temperatureAtNight;
                }
                else if(day.temperatureAtNight < 0){
                          day.temperatureAtNight = "-" + day.temperatureAtNight ;
                     }
                console.log("[yesterday nightTemp]:",day.temperatureAtNight);

                //weather code
                var weatherCode = observationsArchiveResp.periods[dayPeriodNumber].ob.weatherPrimaryCoded;
                var cloudCode = observationsArchiveResp.periods[dayPeriodNumber].ob.cloudsCoded;
                day.weatherCondition = analyzeWeatherCode(cloudCode, weatherCode);
                console.log("[weather condition]:", day.weatherCondition);

                //humidity
                day.humidity = observationsArchiveResp.periods[dayPeriodNumber].ob.humidity;
                if(day.humidity <= 33.333){
                    day.humidityTitle = 0;
                }

                if(day.humidity > 33.333 && day.humidity <= 66.666){
                    day.humidityTitle = 1;
                }

                if(day.humidity > 66.666){
                    day.humidityTitle = 2;
                }
                day.humidity += "%";

                console.log("[yesterday humidity]:",day.humidity, day.humidityTitle);
                //yesterday wind dir

                var windDirDEG = observationsArchiveResp.periods[dayPeriodNumber].ob.windDirDEG;

                if(windDirDEG <= 22){
                  day.windDirection = "N";
                }

                if(windDirDEG >= 23 && windDirDEG <= 67){
                  day.windDirection = "NE";
                }

                if(windDirDEG >= 68 && windDirDEG <= 112){
                  day.windDirection = "E";
                }

                if(windDirDEG >= 113 && windDirDEG <= 157){
                  day.windDirection = "SE";
                }

                if(windDirDEG >= 158 && windDirDEG <= 202){
                  day.windDirection = "S";
                }

                if(windDirDEG >= 203 && windDirDEG <= 247){
                  day.windDirection = "SW";
                }

                if(windDirDEG >= 248 && windDirDEG <= 292){
                  day.windDirection = "W";
                }

                if(windDirDEG >= 293 && windDirDEG <= 359){
                  day.windDirection = "NW";
                }

                console.log("[yesterday wind dir]:", day.windDirection);

                //yesterday wind speed
                day.windSpeed = observationsArchiveResp.periods[dayPeriodNumber].ob.windSpeedMPH + "mph";
                console.log("[wind speed]:", day.windSpeed);

                //yesterday moon
                var d = day.date.split(" / ");
                day.moonPhase = moonPhase(d[2], d[1], d[0]);
                console.log("[yesterday moonPhase]",day.moonPhase);

          }

        });

    });

}


// http://api.aerisapi.com/batch/50.4631632,30.3571629?requests=
// /observations/archive,/forecasts%3Ffilter=daynight%26limit=2,/sunmoon&client_id=CJJJaR93zeaUcqYar9FIh&client_secret=Ij7u8zZ9hc9syrHYjDP1q9w0wR1DZriljQpUpPfs

var newForecast1 = {}, newForecast2 = {}, newForecast3 = {};

        newForecast1.date = "24 / 05 / 2015";
        newForecast1.weatherCondition = "Waterspouts";
        newForecast1.temperatureAtDay = "+15";
        newForecast1.temperatureAtNight = "+13";
        newForecast1.windSpeed = "17mph";
        newForecast1.windDirection = "se";
        newForecast1.moonPhase = 2;
        newForecast1.humidity = 2;
        newForecast1.humidityTitle = "60%";

        newForecast2.date = "25 / 05 / 2015";
        newForecast2.weatherCondition = "Hail";
        newForecast2.temperatureAtDay = "-15";
        newForecast2.temperatureAtNight = "+13";
        newForecast2.windSpeed = "17mph";
        newForecast2.windDirection = "se";
        newForecast2.moonPhase = 2;
        newForecast2.humidity = 2;
        newForecast2.humidityTitle = "60%";

        newForecast3.date = "26 / 05 / 2015";
        newForecast3.weatherCondition = "Thunderstorm";
        newForecast3.temperatureAtDay = "+15";
        newForecast3.temperatureAtNight = "+13";
        newForecast3.windSpeed = "17mph";
        newForecast3.windDirection = "se";
        newForecast3.moonPhase = 2;
        newForecast3.humidity = 2;
        newForecast3.humidityTitle = "60%";

var response = {"yesterday": newForecast1, "today": newForecast2, "tomorrow": newForecast3};
module.exports = response;