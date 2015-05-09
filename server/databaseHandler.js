var fs = require('fs');

function userExists(login, password){
    var users = JSON.parse(fs.readFileSync('data/users.json','utf-8')),
        exists = false;
    //console.log(users);
    //fs.readFile('/data/users.json', function (err, data) {
    //    if (err) throw err;
    //    users = JSON.Parse(data);
    //    checkUser();
    //});

    //function checkUser(){
        for(var i = 0; i < users.length; i++)
        {
            if ((users[i].login === login) &&(users[i].password === password)) {
                return true;
            }
        }
    return false;
    //}
}

exports.userExists = userExists;
