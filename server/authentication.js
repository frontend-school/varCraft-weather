var databaseHandler = require('./databaseHandler');

var users =[];

function User(login){
    this.login = login;
    this.refreshTime = new Date().getTime();
}

setInterval(function(){
    for(var i = 0; i < users.length; i++){
        if(new Date().getTime() - users[i].refreshTime < 1800000)
            removeUser('', i);
    }
}, 60000);

function addUser(login,password){
    if(!databaseHandler.userExists(login, password)) return 1;
    var index = searchUser(login);
    if(index === -1) {
        users.push(new User(login));
        return 0;
    }
    else {
        refreshUser('', index);
        return 2;
    }
}

function searchUser(login){
    for(var i = 0; i < users.length; i++){
        if(users[i].login === login) return i;
    }
    return -1;
}

function refreshUser(login, index){
    index = index || searchUser(login);
    (index > -1) && (users[index].refreshTime = new Date().getTime());
}

function removeUser(login, index){
    index = index || searchUser(login);
    (index > -1) && (users = users.splice(index, 1));
}

exports.addUser = addUser;
exports.searchUser = searchUser;
exports.refreshUser = refreshUser;
exports.removeUser = removeUser;