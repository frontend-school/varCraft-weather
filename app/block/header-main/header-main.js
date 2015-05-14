function headerMain(){
    var request = 'http://' + window.location.host + '/logout',
        xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location.href = 'http://' + window.location.host + '/';
        }
    };

    xmlhttp.open("GET", request, true);
    xmlhttp.send()
}