//api - 788362a84fe3647e4bc964823a588f45

function weatherScreen() {
    if (!username) return;

    setTimeout(function () {
        window.location.href = 'http://' + window.location.host;
    }, 1800100);

    var request = 'http://api.openweathermap.org/data/2.5/weather?q=Kiev,ua';//&APPID=788362a84fe3647e4bc964823a588f45';
    var result = {};
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            result = JSON.parse(xmlhttp.responseText);
            write();
        }
    };

    function write() {
        alert('Current temperature in Kiev, UA: ' + (result.main.temp-273).toFixed(0) + ' degrees Celsius');
        console.log(result);
    }

    xmlhttp.open("GET", request, true);
    xmlhttp.send();
}