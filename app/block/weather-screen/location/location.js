var geocoder;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.730885, -73.997383);
    codeLatLng();
}

function codeLatLng() {
    navigator.geolocation.getCurrentPosition(successcb, errorcb);
    function successcb(position) {
        var input = position.coords.latitude + ', ' + position.coords.longitude;

        var latlngStr = input.split(',', 2); //array [lat, lon]
        var lat = parseFloat(latlngStr[0]);
        var lng = parseFloat(latlngStr[1]);
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[6]) {
                    publish(new Topic('location', results[6],{replace:true}));
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }
    function errorcb(positionError){
        console.log(positionError);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);