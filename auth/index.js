var db = require('./db.json');

function checkUser(login, password){
	if(login&&password){
		return true;
	}
	else return false;
}

module.exports = checkUser;