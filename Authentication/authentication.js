const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let users = [];
const [secret_key, expireTime] = _get_configurations();


function _get_configurations(){
	if (!process.env.TOKEN_SECRET || !process.env.TOKEN_EXPIRE_TIME){
		console.error("No secret key found in config File.");
		throw new Error("No secret key or expire time found in config File.");
	}
	return [process.env.TOKEN_SECRET, process.env.TOKEN_EXPIRE_TIME];
}


async function login(username, password){
	const salt = "";
	const database_password = "";
	const permission = "";
	try{
		await bcrypt.compare(salt + password, database_password);
		const curr_date = new Date(); 
		const time = curr_date.getTime();
		const user = {
			username: username,
			permission: permission,
			issued_on: time
		};
		const token = jwt.sign(JSON.stringify(user), secret_key, { expiresIn: expireTime });
		user.token = token;
		users.append(user);
		return  token; 
	}catch(err){
		throw new Error("Wrong user credentials");
	}
}

async function logout(token){
	for (let i = 0; i < users.length; i++) { 
		if (users[i].token === token){
			users.splice(i);
			break;
		}
	}
}

async function register(username, alias, password){
	const salt = require("crypto").randomBytes(8).toString("hex");
}

async function check_login(token){

}

module.exports =  {
	login,
	logout,
	register,
	check_login
};