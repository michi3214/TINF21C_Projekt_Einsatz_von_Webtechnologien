const JWT = require("jsonwebtoken");
const BCRYPT = require("bcrypt");

const Database = require("./../Database/Database");
const privileges = require("../constant").privileges;

const users = [];
const [secret_key, expireTime] = _get_configurations();


const check_periode = 5;
const check_interval = check_periode * 60 * 1000;
setInterval(function() {
	for (let i = 0; i < users.length; i++) { 
		if (new Date().getTime() - new Date(users[i].issued_on).getTime > expireTime){
			console.log("user at index " + i + "is expired.");
			users.splice(i);
		}
	}
}, check_interval);



function _get_configurations(){
	if (!process.env.TOKEN_SECRET || !process.env.TOKEN_EXPIRE_TIME){
		console.error("No secret key found in config File.");
		throw new Error("No secret key or expire time found in config File.");
	}
	return [process.env.TOKEN_SECRET.trim(), parseInt(process.env.TOKEN_EXPIRE_TIME.trim())];
}

async function _add_user(username, privileges){
	const user = {
		username: username,
		privileges: privileges,
		issued_on: new Date().getTime()
	};
	const token = JWT.sign(
		{username: username}, 
		secret_key, { expiresIn: expireTime}
	);
	user.token = token;
	users.push(user);
	return token;
}



async function login(username, password){
	// TODO: Data must be fetched from database 
	const database_password = "";
	const permission = "";
	try{
		await BCRYPT.compare(password, database_password);
		return await _add_user(username, permission);
	}catch(err){
		throw new Error("Wrong user credentials");
	}
}

async function logout(cookies){
	if(Object.prototype.hasOwnProperty.call(cookies, "access_token")){
		const token = cookies.access_token;

		for (let i = 0; i < users.length; i++) { 
			if (users[i].token === token){
				users.splice(i);
				break;
			}
		}
	}
}

async function register(username, alias, password){
	const privilege = privileges["user"];
	const salt = await BCRYPT.genSalt(15);
	const password_hash = await BCRYPT.hash(password, salt);
	const result = await Database.add_user_to_database(username,alias,privilege,password_hash);
	if (!result){
		const token = await _add_user(username, privilege);
		console.log("User registered: " + username + " was added successfully.");
		return token;
	}else{
		// TODO: controller should check for string and output it
		return result.msg;
	}
}

async function check_login(cookies){
	const user = {
		login:false,
		privilege: privileges["basic"]
	};
	if(Object.prototype.hasOwnProperty.call(cookies, "access_token")){
		const token = cookies.access_token;
		try{
			const dec_token = JWT.verify(token, secret_key);
			const verify = users.filter((user)=> user.username === dec_token.username && user.token === token);
			console.log(verify);
			if(verify.length === 1){
				console.log("User " + dec_token.username + " allowed");
				user.login = true;
				user.privilege = verify[0].privilege;
				user.name = verify[0].username;
				verify[0].issued_on = new Date().getTime();
			}else if(verify.length > 1){
				console.error("Internal server error, too many valid users for token found.\n Can not accept: " + dec_token.username);
			}else{
				// TODO 
				console.error("Unauthorized token used.");
			}
		}catch(err){
			// TODO: token expired 
			console.error("Can not verify user. " + err);
		}
		
	}
	return user;
}



module.exports =  {
	login,
	logout,
	register,
	check_login
};