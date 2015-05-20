window.MYAPPLICATION = window.MYAPPLICATION || {};

window.MYAPPLICATION.helperModule = (function () {
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
    return {
        getElement: function (name) {
            return _getElement(name);
        },
        addClassName: function (name, className) {
            _addClassName(name, className);
        },
        removeClassName: function (name, className) {
            _removeClassName(name, className);
        },
        replaceClassName: function (name, oldName, newName) {
            _replaceClassName(name, oldName, newName);
        },
        writeInto: function(element, content) {
            _writeInto(element, content);
        }
    };
}());