window.varCraft = window.varCraft || {};
window.varCraft = window.varCraft || {};
window.varCraft.dom = window.varCraft.dom || {};

window.varCraft.dom = (function(namespace){
        var dom = {};
        dom.getElem = function(className){
            return document.querySelector(className);
        };

        dom.changeContent = function(elem, newContent){
            if(elem){
                elem.innerHTML = newContent;
            }

        };

        dom.substituteClass = function(elem, regExp, newClass){
            elem.className = elem.className.replace(regExp, newClass);
        };

        dom.removeClass = function(elem, className){
                elem.classList.remove(className);
        };

        dom.addClass = function(elem, className){
                elem.classList.add(className);
        };

        dom.checkClass = function(elem, className){
                return elem.classList.contains(className);
        };

        return dom;
})(window.varCraft);

