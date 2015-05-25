window.varCraft = window.varCraft || {};
window.varCraft.locationView = window.varCraft.locationView || {};




window.varCraft.locationView = (function(namespace){
    function init(){
        var city = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.cityField),
            cityMobile = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.cityFieldMobile),
            country = namespace.services.dom.getElem(namespace.CONSTANTS.cssNames.countryField);


        this.refreshCity = function(newCity){
            if(newCity && typeof newCity === "string"){
                city.innerHTML = newCity;
                cityMobile.innerHTML = newCity;
                return true;
            }
        }

        this.refreshCountry = function(newCountry){
            if(newCountry && typeof newCountry === "string"){
                country.innerHTML = newCountry;
                return true;
            }
        }
    }

    return {
        _init: init
    }

})(window.varCraft);

