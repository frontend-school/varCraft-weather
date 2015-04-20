function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function main(){
var weatherRequest = new XMLHttpRequest();

weatherRequest.open('GET', 'http://api.aerisapi.com/observations/kiev,ua?client_id=CJJJaR93zeaUcqYar9FIh&client_secret=Ij7u8zZ9hc9syrHYjDP1q9w0wR1DZriljQpUpPfs', false);

weatherRequest.send();

if (weatherRequest.status != 200) {
  alert( weatherRequest.status + ': ' + weatherRequest.statusText );
} else {
 // alert( weatherRequest.responseText );
}

var output = document.querySelector(".output-js");


var weather = JSON.parse(weatherRequest.responseText);
console.log("Received JSON object: ", weather);
var temperatureC = "Current temperature in C:" + "<strong>" + weather.response.ob.tempC + "</strong>";
var temperatureF = "Current temperature in F:" + "<strong>" + weather.response.ob.tempF + "</strong>";
var weatherConditions = "Weater conditions: " + "<strong>" + weather.response.ob.weather + "</strong>";
var windDir = "wind direction: " + "<strong>" + weather.response.ob.windDir + "</strong>";


output.innerHTML =  temperatureC +"<br>" + temperatureF + "<br>" + weatherConditions + "<br>" + windDir;

}

ready(main);