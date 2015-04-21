function hideForm() {
    document.getElementById("popup__overlay").className = document.getElementById("popup__overlay").className.replace
    ( /(?:^|\s)popup__overlay_active(?!\S)/g , '' );
    document.getElementById("popup__overlay").className += " popup__overlay_hidden";
}

function showForm() {
    document.getElementById("popup__overlay").className = document.getElementById("popup__overlay").className.replace
    ( /(?:^|\s)popup__overlay_hidden(?!\S)/g , '' );
    document.getElementById("popup__overlay").className += " popup__overlay_active";
}

function clearForm() {
    document.getElementsByClassName("login-form")[0].reset();
}
