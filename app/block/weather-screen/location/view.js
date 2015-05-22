locationView();
function locationView(){
    var location = subscribe('location');
    if(!location){
        setTimeout(locationView, 1000);
        return;
    }
    else {
        location = JSON.parse(location);
        console.log(location);
    }
    var city = location.address_components[0].long_name;
    var country = location.address_components[2].long_name;
    document.getElementsByClassName('info__location_city')[0].innerHTML = city;
    document.getElementsByClassName('info__location_country')[0].innerHTML = country;
}