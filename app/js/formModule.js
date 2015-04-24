var formModule = (function () {
    return {
        hideForm: function () {
            helperModule.getElement(popup).className = helperModule.getElement(popup).className.replace
            ( /(?:^|\s)popup__overlay_active(?!\S)/g , '' );
            helperModule.getElement(popup).className += popupHidden;
        },
        showForm: function () {
            helperModule.getElement(popup).className = helperModule.getElement(popup).className.replace
            ( /(?:^|\s)popup__overlay_hidden(?!\S)/g , '' );
            helperModule.getElement(popup).className += popupActive;
        },
        clearForm: function () {
            helperModule.getElement(loginForm).reset();
        }
    };
}());




