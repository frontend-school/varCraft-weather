window.varCraft = window.varCraft || {};
window.varCraft.locationController = window.varCraft.locationController || {};

window.varCraft.locationController = (function(namespace){
    function start(){
        namespace.locationView._init();

        this.geoParse = function(obj){
                    var description = obj.response.GeoObjectCollection.featureMember[0].GeoObject.description;
                    var locations = description.split(", ");
                    console.log(locations);
                    namespace.locationModel.setCity(locations[0]);
                    namespace.locationModel.setCountry(locations[1]);

                    console.log(namespace.locationModel.getCity());
                    console.log(namespace.locationModel.getCountry());

                    namespace.locationView.refreshCity(namespace.locationModel.getCity());
                    namespace.locationView.refreshCountry(namespace.locationModel.getCountry());
        }

        this.getLocation = function(){
                    function geoSuccess(position) {
                          var latitude = position.coords.latitude;
                          var longitude = position.coords.longitude;
                          jsonp("http://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&geocode=" + longitude + "," + latitude + "&callback=varCraft.locationController.geoParse");
                    }

                     navigator.geolocation.getCurrentPosition(geoSuccess);
        }

    }

    return {
        _start: start
    }

})(window.varCraft);

