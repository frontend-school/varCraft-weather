window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.facadeDOM = (function () {
    function _getElement(name) {
        return document.getElementById(name);
    }

    function _addClassName(name, className) {
        _getElement(name).className += " " + className;
    }

    function _removeClassName(name, className) {
        var elem = _getElement(name),
            regStr = "(?:^|\\s)" + className + "(?!\\S)",
            regExp = new RegExp(regStr, "g");
        elem.className = elem.className.replace(regExp, '');
    }

    function _replaceClassName(name, oldName, newName) {
        _removeClassName(name, oldName);
        _addClassName(name, newName);
    }

    function _writeInto(element, content) {
        var elem = _getElement(element);
        elem.textContent = content;
    }

    function _getValue(id) {
        return _getElement(id).value;
    }

    return {
        getElement: _getElement,
        addClassName: _addClassName,
        removeClassName: _removeClassName,
        replaceClassName: _replaceClassName,
        writeInto: _writeInto,
        getValue: _getValue
    };
}());