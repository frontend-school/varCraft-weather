MYAPPLICATION.formModule = (function () {
    return {
        hideForm: function () {
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.popup).className = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.popup).className.replace
            ( /(?:^|\s)popup__overlay_active(?!\S)/g , '' );
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.popup).className += MYAPPLICATION.CONST.ID.popupHidden;
        },
        showForm: function () {
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.popup).className = MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.popup).className.replace
            ( /(?:^|\s)popup__overlay_hidden(?!\S)/g , '' );
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.popup).className += MYAPPLICATION.CONST.ID.popupActive;
        },
        clearForm: function () {
            MYAPPLICATION.helperModule.getElement(MYAPPLICATION.CONST.ID.loginForm).reset();
        }
    };
}());




