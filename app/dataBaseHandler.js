/**
 * Created by Triplecorpse on 13.04.2015.
 */

var users = [
    {login:'Victor', password:'thebest'},
    {login:'Mikhail', password:'thebest'}
];

function userExists(login, password){
    for(var user in users){
        if ((users.hasOwnProperty(user)) && (user[login] == login) &&(user[password] == password)) {
            return true;
        }
    }
    return false;
}

exports.userExists = userExists;