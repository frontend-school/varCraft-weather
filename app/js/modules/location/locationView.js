window.varCraft = window.varCraft || {};
window.varCraft.locationView = window.varCraft.locationView || {};




window.varCraft.locationView = (function(namespace){
    function init(){
        var city = namespace.dom.getElem(namespace.CONST.cityField),
            cityMobile = namespace.dom.getElem(namespace.CONST.cityFieldMobile),
            country = namespace.dom.getElem(namespace.CONST.countryField);


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

