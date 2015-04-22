/**
 * Created by Triplecorpse on 13.04.2015.
 */

var users = [
    {login:'Victor', password:'thebest'},
    {login:'Maksym', password:'thebest'}
];

function userExists(login, password){
    /*for(var i = 0; i < users.length; i++)
    {
        if ((users[i].login == login) &&(users[i].password == password)) {
            return true;
        }
    }
    return false;*/
return true;
}

exports.userExists = userExists;
