
(function (namespace) {
    function updateClassModificator(element, classModToSet, classModCollection ) {
        var classes = element.className.split(' '),
            c1,
            ind;

        for (var key in classModCollection) {
            ind = classes.indexOf(classModCollection[key]);
            if ( ind !== -1 ) {
                classes.splice(ind, 1);
            }
        }

        classes.push(classModToSet);
        element.className = classes.join(' ');
    }

    namespace.services.updateClassModificator = updateClassModificator;
})(window.vCWeather);