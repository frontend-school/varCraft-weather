function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getweather(city) {
    var answer = httpGet("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",ua&units=metric&APPID=b04a06714afca79362dec1420563b1e7");

    return answer;
}

function writeSomething(){
    var weatherJSON = getweather("Kiev");
    console.log(weatherJSON);

    var weatherObj = JSON.parse(weatherJSON);
    console.log(weatherObj);

    document.getElementById("demo").innerHTML = weatherObj.weather[0].description.toString();
}


