const JWT = require("jsonwebtoken");
const BCRYPT = require("bcrypt");

const Database = require("./../Database/Database");
const privileges = require("../constant").privileges;

const users = [];
const [secret_key, expireTime] = _get_configurations();


function _get_configurations(){
	if (!process.env.TOKEN_SECRET || !process.env.TOKEN_EXPIRE_TIME){
		console.error("No secret key found in config File.");
		throw new Error("No secret key or expire time found in config File.");
	}
	return [process.env.TOKEN_SECRET.trim(), parseInt(process.env.TOKEN_EXPIRE_TIME.trim())];
}

async function _add_user(username, privileges){
	const curr_date = new Date(); 
	const time = curr_date.getTime();
	const user = {
		username: username,
		privileges: privileges,
		issued_on: time
	};
	const token = JWT.sign(
		user, 
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

async function logout(token){
	for (let i = 0; i < users.length; i++) { 
		if (users[i].token === token){
			users.splice(i);
			break;
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
		console.log("User " + username + " was added successfully.");
		return token;
	}else{
		// TODO: controller should check for string and output it
		return result.msg;
	}
}

async function check_login(cookies){
	console.log(cookies);
	// const data = JWT.verify(token, secret_key);
	return {
		login:false,
		name:"Hallo",
		privilege:1 // use privileges from constants
	};
}

module.exports =  {
	login,
	logout,
	register,
	check_login
};