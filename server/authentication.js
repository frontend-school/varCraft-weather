var databaseHandler = require('./databaseHandler');

var users =[];

function User(login,sid){
    this.login = login;
    this.sid = sid;
}

//setInterval(function(){
//    for(var i = 0; i < users.length; i++){
//        if(new Date().getTime() - users[i].sid < 1800000)
//            removeUser('', i);
//    }
//}, 60000);

function addUser(login,password,sid){
    if(!databaseHandler.userExists(login, password)) return 1;
    if(((login.toString().match(/^\d+$/)) != null) || ((sid.toString().match(/^\d+$/)) == null)) return 3;
    var index = searchUser(login);
    if(index === -1) {
        users.push(new User(login,sid));
        showUsers('Added');
        return 0;
    }
    else {
        refreshUser('', index, new Date().getTime());
        return 2;
    }
}

function searchUser(login){
    for(var i = 0; i < users.length; i++){
        if((users[i].login == login) || (users[i].sid == login)) return i;
    }
    return -1;
}

function refreshUser(login, index, sid){
    index = (index === -1) ? searchUser(login) : index;
    (index > -1) && (users[index].sid = sid);
    console.log(index);
    showUsers('Refreshed');
}

function removeUser(login){
    var index = searchUser(login);
    (index > -1) && (users.splice(index, 1));
    showUsers('Removed');
}

function showUsers(action){
    console.log(action);
    console.log(users);
}

function getUser(login, index){
    index = (index == undefined) ? searchUser(login) : index;
    if(index != -1)
        return users[index];
}

exports.addUser = addUser;
exports.getUser = getUser;
exports.searchUser = searchUser;
exports.refreshUser = refreshUser;
exports.removeUser = removeUser;