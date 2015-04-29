var PouchDB = require('pouchdb');
var db = new PouchDB('weatherDb');
var remoteCouch = false;

addTodo('There is a todo');
function addTodo(text) {
    var todo = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
    };
    db.put(todo, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
        }
    });
}

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
