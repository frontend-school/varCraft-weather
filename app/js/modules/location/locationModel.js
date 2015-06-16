window.varCraft = window.varCraft || {};
window.varCraft.locationModel = window.varCraft.CONST || {};

window.varCraft.locationModel = (function(namespace){
    var city = "World", country = "Earth", latitude="", longitude="";

    return {
        setCity: function(newCity){
            if(newCity && (typeof newCity === "string")){
                city = newCity;
            }
        },

        setCountry: function(newCountry){
            if(newCountry && (typeof newCountry === "string")){
                country = newCountry;
            }
        },

        setLatitude: function(newLatitude){
            latitude = newLatitude;
            console.log("[locationModel latitude]:",latitude);
        },

        setLongitude: function(newLongitude){
            longitude = newLongitude;
            console.log("[locationModel longitude]", longitude);
        },

        getCity: function(){
            return city;
        },

        getCountry: function(){
            return country;
        },

        getLatitude: function(){
            return latitude;
        },

        getLongitude: function(){
            return longitude;
        }

    };
})(window.varCraft);