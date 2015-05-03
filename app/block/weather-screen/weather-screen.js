//api - 788362a84fe3647e4bc964823a588f45

function weatherScreen() {
    //if (!username) return;

    setTimeout(function () {
        window.location.href = 'http://' + window.location.host;
    }, 1800100);

    setDateTime();
    function setDateTime(){
        var dateTime = new Date();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours >= 12 ? hours - 12 : hours;

        var date = dateTime.toDateString();

        //var midday = midday || document.getElementsByClassName('info__datetime_time')[0].innerHTML;
        //document.getElementsByClassName('info__datetime_time_midday')[0].innerHTML = ampm;
        document.getElementsByClassName('info__datetime_time')[0].innerHTML = hours + ':' + minutes +
        '\<div class="info__datetime_time_midday"\>' + ampm + '\</div>';
        document.getElementsByClassName('info__datetime_date')[0].innerHTML = date;
    }
    setInterval(setDateTime(), 60000);

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
        document.getElementById('header-main__info_userinfo').innerHTML = 'Hello, ' + username + '! ' + ('Current temperature in Kiev, UA: ' + (result.main.temp-273).toFixed(0) + ' degrees Celsius');
        console.log(result);
    }

    xmlhttp.open("GET", request, true);
    xmlhttp.send();
}