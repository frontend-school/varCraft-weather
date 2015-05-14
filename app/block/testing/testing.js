/**
 * Created by Triplecorpse on 14.05.2015.
 */
var request = 'http://localhost:3000/logout';//&APPID=788362a84fe3647e4bc964823a588f45';
var result = {};
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        result = JSON.parse(xmlhttp.responseText);
        write();
    }
};

function write() {
    //var username = document.cookie.slice(6);
    document.getElementById('body').innerHTML = result;
    console.log(result);
}

xmlhttp.open("GET", request, true);
xmlhttp.send();