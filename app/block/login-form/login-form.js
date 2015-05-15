function loginSubmit(){
    console.log('gfhgfh');
    var login = document.getElementsByName('login')[0].value,
        password = document.getElementsByName('password')[0].value,
        request = 'http://' + window.location.host + '/login?login=' + login + '&password=' + password,
        result,
        xmlhttp = new XMLHttpRequest();

    document.cookie = "login=" + document.getElementsByName('login')[0].value;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location.href = 'http://' + window.location.host + '/weather';
            result = JSON.parse(xmlhttp.responseText);
            write();
        }
    };

    function write() {
        console.log(result);
    }

    xmlhttp.open("GET", request, true);
    xmlhttp.send()
}

function loginForm(){

}