function hideDashboard(){
    document.getElementById("hello").innerHTML = "";
    document.getElementById("dashboard").className = document.getElementById("dashboard").className.replace
    ( /(?:^|\s)b-dashboard_active(?!\S)/g , '' );
    document.getElementById("dashboard").className += " b-dashboard_hidden";
}

function greating(name) {
    document.getElementById("hello").innerHTML = "Hello " + name;

    document.getElementById("dashboard").className = document.getElementById("dashboard").className.replace
    ( /(?:^|\s)b-dashboard_hidden(?!\S)/g , '' );
    document.getElementById("dashboard").className += " b-dashboard_active";
}