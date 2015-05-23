window.varCraft = window.varCraft || {};
window.varCraft.services = window.varCraft.services || {};
window.varCraft.services.dom = window.varCraft.services.dom || {};

window.varCraft.services.dom = (function(namespace){
        var dom = {};
        dom.getElem = function(className){
            return document.querySelector(className);
        };

        dom.changeContent = function(elem, newContent){
            if(elem){
                elem.innerHTML = newContent;
            }

        };

        dom.removeClass = function(elem, className){
                elem.classList.remove(className);
        };

        dom.addClass = function(elem, className){
                elem.classList.add(className);
        };

        return dom;
})(window.varCraft)

