window.varCraft = window.varCraft || {};
window.varCraft.locationModel = window.varCraft.CONST || {};

window.varCraft.locationModel = (function(namespace){
    var city = "World", country = "Earth";

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

        getCity: function(){
            return city;
        },

        getCountry: function(){
            return country;
        }
    };
})(window.varCraft);