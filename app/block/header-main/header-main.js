function headerMain(){
    username = document.getElementById('header-main__info_userinfo').innerHTML;
    username = username.slice(7, username.length - 1);
    if(username == 'undefined' || username == 'null')
    {
        username = undefined;
    }
}