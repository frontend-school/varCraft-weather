var dashboardModule = (function () {
    return {
        hideDashboard: function () {
            document.getElementById("hello").innerHTML = "";
            document.getElementById("dashboard").className = document.getElementById("dashboard").className.replace
            (/(?:^|\s)b-dashboard_active(?!\S)/g , '');
            document.getElementById("dashboard").className += " b-dashboard_hidden";
        },
        showDashboard: function (name) {
            document.getElementById("hello").innerHTML = "Hello " + name;

            document.getElementById("dashboard").className = document.getElementById("dashboard").className.replace
            (/(?:^|\s)b-dashboard_hidden(?!\S)/g , '');
            document.getElementById("dashboard").className += " b-dashboard_active";
        }
    };
}());

