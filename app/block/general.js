var username;
setInterval(function(){
    var request = 'http://' + location.host + '/ask';
    var result = {};
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            result = JSON.parse(xmlhttp.responseText);
            handleResponse();
        }
    };

    function handleResponse() {
        console.log(result);
        if(result['needLogout']){
            location.href = 'http://' + location.host + '/logout';
        }
    }

    xmlhttp.open("GET", request, true);
    xmlhttp.send();
}, 20000);